import {
  Box,
  Heading,
  Text,
  Link,
  UnorderedList,
  ListItem,
  Code,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

function CodeBlock({ children }) {
  return (
    <Box bg="whiteAlpha.100" p={3} borderRadius="md" mb={4} overflowX="auto">
      <Text fontFamily="mono" fontSize="sm" whiteSpace="pre">
        {children}
      </Text>
    </Box>
  );
}

export default function GPUMemoryHierarchy() {
  return (
    <>
      <Head>
        <title>GPU Memory Hierarchy - Hardik Gupta</title>
      </Head>

      <Box py="115px" px={4} maxWidth={500} mx="auto">
        <NextLink href="/blogs" passHref>
          <Link color="white" opacity={0.5} fontSize="md" mb={6} display="inline-block">
            &larr; Back to Blogs
          </Link>
        </NextLink>

        <Heading as="h1" size="lg" mb={2}>
          GPU Memory Hierarchy
        </Heading>
        <Text opacity={0.5} fontSize="sm" mb={10}>
          January 5, 2026
        </Text>

        {/* Level 0 */}
        <Heading as="h2" size="md" mb={4}>
          Level 0: Why does Memory even matter?
        </Heading>
        <Text mb={4}>
          Considering that the total time can be spent either on compute or on
          transferring data. GPU&apos;s compute structure is so fast that{" "}
          <u>the bottleneck is the transfer of data</u>.
        </Text>
        <Text mb={2}>List of data hierarchy from fastest to slowest:</Text>
        <CodeBlock>
{`Registers          ← fastest
Shared Memory
L1/L2 Cache
HBM/Global Memory
CPU/System RAM     ← slowest`}
        </CodeBlock>
        <Box mb={10} />

        {/* Level 1 */}
        <Heading as="h2" size="md" mb={4}>
          Level 1: What is GPU Physically?
        </Heading>
        <Text mb={2}>Simply GPU has:</Text>
        <UnorderedList mb={10} spacing={1}>
          <ListItem>A lot of simple math units</ListItem>
          <ListItem>A small amount of <u>fast memory</u> (on the chip itself)</ListItem>
          <ListItem>A large amount of <u>slow memory</u> (separate chips on the board)</ListItem>
          <ListItem>Connecting all the parts together</ListItem>
        </UnorderedList>

        {/* Level 2 */}
        <Heading as="h2" size="md" mb={4}>
          Level 2: Two Types of Memory
        </Heading>
        <Text mb={4}>
          There are fundamentally only <u>two types of memory</u> on a GPU:
        </Text>

        <Heading as="h3" size="sm" mb={2}>
          Type A: On-chip memory (SRAM)
        </Heading>
        <UnorderedList mb={4} spacing={1}>
          <ListItem>On the same silicon die as the compute units</ListItem>
          <ListItem>
            Made up of <u>6 transistors per bit</u> (called SRAM: Static RAM)
          </ListItem>
          <ListItem>Fast because electrons travel only a smaller distance</ListItem>
          <ListItem>Small because 6 transistors per bit is expensive in chip area</ListItem>
          <ListItem>On H100: <Code>50 MB</Code></ListItem>
        </UnorderedList>

        <Heading as="h3" size="sm" mb={2}>
          Type B: Off-chip memory (HBM/DRAM)
        </Heading>
        <UnorderedList mb={4} spacing={1}>
          <ListItem>Separate chips stacked on top of or next to GPU die</ListItem>
          <ListItem>
            Made up of <u>1 transistor + 1 capacitor per bit</u> (called DRAM)
          </ListItem>
          <ListItem>Slow because signals must travel off the die, through packaging to another chip</ListItem>
          <ListItem>Large because 1 transistor per bit is cheap</ListItem>
          <ListItem>On H100: <Code>80 GB</Code></ListItem>
        </UnorderedList>
        <Text mb={10}>
          Everything in the memory hierarchy is just different ways of organizing
          these two types.
        </Text>

        {/* Level 3 */}
        <Heading as="h2" size="md" mb={4}>
          Level 3: Why can&apos;t we make all memory fast
        </Heading>
        <Text mb={4}><u>Physics and economics</u>:</Text>
        <CodeBlock>
{`SRAM (fast):  ~$100   per MB, needs a lot of chip area
DRAM (slow):  ~$0.01  per MB, separate cheap chips`}
        </CodeBlock>
        <Text mb={2}>To store a 70B parameter at FP16:</Text>
        <CodeBlock>
{`In SRAM: 140 GB x $100/MB   = $14M just for memory
In DRAM: 140 GB x $0.01/MB  = $1,400`}
        </CodeBlock>
        <Text mb={4}>
          Considering even if we can afford it, you <u>can&apos;t fit</u> 140 GB of
          SRAM on a chip. The entire H100 die area is ~814 mm&sup2;. 140 GB of
          SRAM would need ~50,000 mm&sup2;.
        </Text>
        <Text mb={10}>
          So we must use DRAM for bulk storage and fast SRAM for the data we are
          actively working on. <u>The memory hierarchy is about managing what&apos;s
          in the fast memory at any given moment.</u>
        </Text>

        {/* Level 4 */}
        <Heading as="h2" size="md" mb={4}>
          Level 4: The Actual Hierarchy
        </Heading>
        <Text mb={6}>Let&apos;s build from Bottom to Top.</Text>

        {/* Global Memory */}
        <Heading as="h3" size="sm" mb={2}>
          Global Memory (HBM) - The warehouse
        </Heading>
        <CodeBlock>
{`Capacity:    80 GB (HBM on GPU board)
Bandwidth:   3.35 TB/s on H100
Latency:     400-600 clock cycles
Visibility:  Every thread on the entire GPU`}
        </CodeBlock>
        <Text mb={6}>
          <u>Why it&apos;s slow:</u> The data has to travel off the GPU
          die, through silicon interposers, to separate HBM chips and back. Even
          at the speed of light, this would take hundreds of nanoseconds. And
          there are millions of threads competing for this bandwidth.
        </Text>

        {/* L2 Cache */}
        <Heading as="h3" size="sm" mb={2}>
          L2 Cache
        </Heading>
        <CodeBlock>
{`Capacity:    50 MB SRAM (shared across all SMs)
Bandwidth:   12 TB/s
Latency:     200 clock cycles
Visibility:  Every thread on entire GPU`}
        </CodeBlock>
        <Text mb={4}>
          We don&apos;t explicitly control L2, the hardware automatically keeps
          recently accessed data here. If you read address <Code>X</Code> from the global
          memory, the L2 cache keeps a copy. If you read <Code>X</Code> again soon, you get
          the cached copy (much faster).
        </Text>
        <Text mb={6}>
          <u>Why it exists?</u>{" "}
          <strong>Temporal Locality:</strong> programs tend to access the same data repeatedly.{" "}
          <strong>Spatial locality:</strong> If you access address 100, you will probably access 101 soon,
          so the cache loads a whole &quot;cache line&quot;.
        </Text>

        {/* L1 / Shared Memory */}
        <Heading as="h3" size="sm" mb={2}>
          L1 Cache / Shared Memory
        </Heading>
        <CodeBlock>
{`Capacity:    228 KB SRAM per SM (configurable split)
Bandwidth:   19 TB/s
Latency:     20-28 clock cycles
Visibility:  L1: threads on THIS SM only (hardware managed)
             Shared Memory: threads in the SAME BLOCK only (programmer managed)`}
        </CodeBlock>
        <Text mb={4}>
          This is where it gets interesting. NVIDIA gives us a choice:
        </Text>
        <UnorderedList mb={4} spacing={1}>
          <ListItem>
            <strong>L1 Cache mode:</strong> Hardware automatically caches global
            memory accesses. You don&apos;t control it.
          </ListItem>
          <ListItem>
            <strong>Shared Memory mode:</strong> You (the programmer) explicitly
            load data here with special instructions and explicitly read from it.
            This gives you control but requires you to manage it.
          </ListItem>
        </UnorderedList>
        <Text mb={2}>
          On modern NVIDIA GPUs, the L1 and shared memory are the <u>same physical SRAM</u>, you configure how much goes into each:
        </Text>
        <CodeBlock>
{`Option A:  128 KB shared  +  100 KB L1
Option B:   64 KB shared  +  164 KB L1
Option C:  228 KB shared  +    0 KB L1`}
        </CodeBlock>
        <Text mb={6}>
          (exact sizes vary by GPU). This makes it really powerful: You load the data from the slow HBM
          once, put it in shared memory, and then ALL threads in the block can
          access it repeatedly at ~10x the speed. <u>This is the #1 optimization
          technique in CUDA programming.</u>
        </Text>

        {/* Registers */}
        <Heading as="h3" size="sm" mb={2}>
          Registers
        </Heading>
        <CodeBlock>
{`Capacity:    256 KB register file per SM
Bandwidth:   Essentially infinite (same as computation)
Latency:     0 extra clock cycles
Visibility:  Only the owning thread. Completely private.`}
        </CodeBlock>
        <Text mb={2}>The catch is they are <u>divided among threads</u>:</Text>
        <CodeBlock>
{`SM has 256 KB = 65,536 registers (32-bit each)

If 2048 threads active:  65,536 / 2048 = 32 registers per thread
If you need 64 registers: only 1024 threads can be active
  → Lower occupancy → Fewer warps to hide latency → potential slowdown`}
        </CodeBlock>
        <Text mb={10}>
          This is the <u>register pressure</u> problem, using too many
          registers and you hurt occupancy. Using too few and you spill to slower
          memory.
        </Text>

        {/* Level 5 */}
        <Heading as="h2" size="md" mb={4}>
          Level 5: Numbers that matter
        </Heading>
        <CodeBlock>
{`Registers       ──(6x faster)──→  Shared Memory
Shared Memory   ──(6x faster)──→  HBM

Each level: ~6x slower but 100-1000x larger`}
        </CodeBlock>
        <Box mb={10} />

        {/* Level 6 */}
        <Heading as="h2" size="md" mb={4}>
          Level 6: Why this matters for ML
        </Heading>

        <Heading as="h3" size="sm" mb={2}>
          The &quot;Arithmetic Intensity&quot; concept
        </Heading>
        <CodeBlock>
{`Arithmetic Intensity = FLOPs per byte loaded from memory

H100 can do:   ~990 TFLOPS (FP16)
H100 can load: ~3.35 TB/s from HBM

Break even point: 990 x 1000 / 3.35 x 1000 = ~295 FLOPs per byte`}
        </CodeBlock>
        <UnorderedList mb={6} spacing={1}>
          <ListItem>
            If our operation does FEWER than 295 FLOPs per byte, we are{" "}
            <u><strong>MEMORY-BOUND</strong></u>
          </ListItem>
          <ListItem>
            If our operation does MORE than 295 FLOPs per byte, we are{" "}
            <u><strong>COMPUTE-BOUND</strong></u>
          </ListItem>
        </UnorderedList>

        <Heading as="h3" size="sm" mb={2}>
          ReLU is memory bound
        </Heading>
        <CodeBlock>
{`output[i] = max(0, input[i])

For each element:
  Load  2 bytes (FP16 input)
  Do    1 FLOP  (compare with 0)
  Store 2 bytes (FP16 output)

Arithmetic intensity = 1 FLOP/4 bytes = 0.25 FLOPs/bytes`}
        </CodeBlock>
        <Text mb={6}>
          We are <u>MEMORY-BOUND</u>.
        </Text>

        <Heading as="h3" size="sm" mb={2}>
          Operator Fusion
        </Heading>
        <Text mb={4}>
          If we fuse <Code>MatMul + Add + ReLU</Code> and somehow avoid writing the MatMul
          output to HBM, reading it for Add, writing Add&apos;s output, reading
          it for ReLU. Instead <u>the intermediate values stay in registers</u>.
        </Text>
        <Box mb={10} />

        <Heading as="h2" size="md" mb={4}>
          Few things to keep in mind
        </Heading>

        {/* Coalesced */}
        <Heading as="h3" size="sm" mb={2}>
          Coalesced Memory Access
        </Heading>
        <Text mb={4}>
          When 32 threads in a warp access global memory, the hardware tries to
          combine their requests:
        </Text>
        <CodeBlock>
{`GOOD (coalesced):
  Thread 0 reads address 0
  Thread 1 reads address 4
  Thread 2 reads address 8  ...
  Hardware combines into ONE 128-byte transaction

BAD (uncoalesced):
  Thread 0 reads address 0
  Thread 1 reads address 1000
  Thread 2 reads address 2000  ...
  Hardware issues 32 SEPARATE transactions. Wastes 32x bandwidth`}
        </CodeBlock>
        <Text mb={6}>
          <u>Rule of thumb:</u> Adjacent threads should access adjacent
          memory addresses.
        </Text>

        {/* Bank Conflicts */}
        <Heading as="h3" size="sm" mb={2}>
          Bank Conflicts (Shared Memory)
        </Heading>
        <Text mb={4}>
          Shared memory is divided into <u>32 banks</u> (one per thread in a warp).
          Each bank can serve one address per cycle.
        </Text>
        <CodeBlock>
{`Bank assignment:  address % 32 = bank number

NO CONFLICT:   Thread i accesses address i (each thread hits a different bank)
CONFLICT:      Thread 0 and Thread 16 both access bank 0 (serialised, 2x slower)
WORST CASE:    All 32 threads access the same bank (32x slower)
EXCEPTION:     All threads access the SAME address (broadcast, no conflict)`}
        </CodeBlock>

        {/* Memory Alignment */}
        <Heading as="h3" size="sm" mb={2}>
          Memory Alignment
        </Heading>
        <Text mb={4}>
          GPUs load data in chunks of 32, 64, or 128 bytes. If your data starts
          at an <u>unaligned address</u>, the hardware needs extra transactions:
        </Text>
        <CodeBlock>
{`Aligned:    tensor starts at address 0, one 128-byte load gets first 128 bytes
Unaligned:  tensor starts at address 7, needs two 128-byte loads, wasted bandwidth`}
        </CodeBlock>
      </Box>
    </>
  );
}
