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
    <Box
      bg="whiteAlpha.50"
      p={4}
      borderRadius="md"
      borderLeft="3px solid"
      borderLeftColor="whiteAlpha.200"
      mb={5}
      overflowX="auto"
    >
      <Text fontFamily="mono" fontSize="xs" whiteSpace="pre" lineHeight="1.7" opacity={0.85}>
        {children}
      </Text>
    </Box>
  );
}

export default function MLInferenceCompilers() {
  return (
    <>
      <Head>
        <title>ML Inference Compilers - Hardik Gupta</title>
      </Head>

      <Box py="115px" px={4} maxWidth={600} mx="auto" lineHeight="1.8">
        <NextLink href="/blogs" passHref>
          <Link color="white" opacity={0.5} fontSize="md" mb={8} display="inline-block">
            &larr; Back to Blogs
          </Link>
        </NextLink>

        <Heading as="h1" size="lg" mb={3} lineHeight="1.3">
          ML Inference Compilers
        </Heading>
        <Text opacity={0.4} fontSize="sm" mb={12}>
          February 18, 2026
        </Text>

        {/* What is a Compiler? */}
        <Heading as="h2" size="md" mb={5}>
          What is a Compiler?
        </Heading>
        <Text mb={4}>
          In the most simplest definition,
        </Text>
        <Text mb={4}>
          <u>A compiler is a translator</u>
        </Text>
        <Text mb={4}>
          It takes something in one language and translates to another and the key constraint
          the meaning should be conserved: the output must do exactly the same as input
        </Text>
        <CodeBlock>
{`Human:      x = a + b
Compilers:   ADD, R1, R2, R3 (CPU Instruction: add register 2 and 3, store in 1)`}
        </CodeBlock>
        <Text mb={10}>
          Human can write in a language he/she can understand and machine write in a language it can
          understand and compilers bridge the gap
        </Text>

        {/* Why can't machine understand our language */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          Why can&apos;t machine understand our language
        </Heading>
        <Text mb={4}>
          A GPU/CPU is made up of just transistors (kind of like tiny switches that are either ON (1) or
          OFF (0). It can only do a handful of primitive/fundamental jobs:
        </Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Add two numbers</ListItem>
          <ListItem>Multiply two numbers</ListItem>
          <ListItem>Compare two numbers</ListItem>
          <ListItem>Load a number from a memory address X</ListItem>
          <ListItem>Store a number to a memory address X</ListItem>
          <ListItem>Jump to instruction at address Y</ListItem>
        </UnorderedList>
        <Text mb={4}>
          That&apos;s essentially it. Everything resolves to the above task.
        </Text>
        <Text mb={10}>
          Writing programs in these primitives is possible but miserable. The whole point is to help
          humans think at a higher level.
        </Text>

        {/* What a compiler actually does */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          What a compiler actually does
        </Heading>
        <Text mb={4}>
          Every compiler from C to TensorRT does three things:
        </Text>
        <Text mb={2}><strong>Step 1: PARSE:</strong> Understand the input</Text>
        <CodeBlock>
{`"x = a + b" -> tree structure: Assignment(x, Add(a, b))`}
        </CodeBlock>
        <Text mb={2}><strong>Step 2: OPTIMIZE:</strong> Make it better (without changing the meaning)</Text>
        <Text mb={2}><strong>Step 3: EMIT:</strong> Output in target language</Text>
        <CodeBlock>
{`Assignment(x, Add(a, b)) -> "ADD R3, R1, R2; STORE R3, [addr_x]"`}
        </CodeBlock>
        <Text mb={10}>
          The optimization step is where compilers earn their keep. A naive translation works, but a
          good compiler produces output that runs <u>10-100x faster</u> through clever transformations.
        </Text>

        {/* Traditional Compiler Example */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          Traditional Compiler Example
        </Heading>
        <Text mb={2}>C code</Text>
        <CodeBlock>
{`for (int i = 0; i< 1000; i ++) {
    result[i] = data[i] * 2;
}`}
        </CodeBlock>
        <Text mb={2}>A naive compiler generates:</Text>
        <CodeBlock>
{`Loop 1000 times:
    Load data[i] from memory
    Multiply by 2
    Store result[i] to memory`}
        </CodeBlock>
        <Text mb={2}>A good compiler generates:</Text>
        <CodeBlock>
{`Loop 250 times:
    Load 4 values at once (SIMD vector load)
    Multiply all 4 by 2 in one instruction (SIMD multiply)
    Store 4 values at once (SIMD vector store)`}
        </CodeBlock>
        <Text mb={4}>
          Same result, <u>4x fewer instructions, 4x fewer memory transactions</u>
        </Text>
        <Text mb={10}>
          The compiler figured out it could use vectorization: processing multiple data items with one
          instruction. The programmer didn&apos;t have to know about SIMD instructions.
        </Text>

        {/* Compiling a Neural Network */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          Compiling a Neural Network
        </Heading>
        <Text mb={4}>
          A neural network is a computation graph
        </Text>
        <Text mb={2}>When you write a neural network in Pytorch:</Text>
        <CodeBlock>
{`def forward(self, x):
    x = self.conv1(x)        # Convolution
    x = F.relu(x)            # ReLU activation
    x = self.pool(x)         # Average pooling
    x = self.fc(x)           # Fully connected (matrix multiply)
    x = F.softmax(x)         # Softmax
    return x`}
        </CodeBlock>
        <Text mb={4}>
          This is really just a description of math operations connected together
        </Text>
        <CodeBlock>
{`Input Image -> Conv (Filter: Add a small window across the image at each position) -> ReLU ->
Pool (Shrink the image) -> FC (Matrix Multiply) -> Softmax -> Output Probabilities`}
        </CodeBlock>
        <Box mb={10} />

        {/* How Pytorch runs (Eager mode) */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          How Pytorch runs (Eager mode)
        </Heading>
        <Text mb={4}>
          Without a compiler, Pytorch executes this line by line:
        </Text>
        <Text mb={2}><em>Step 1:</em> Run conv on CPU</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>CPU tells GPU</ListItem>
          <ListItem>GPU runs it, writes 50 MB to HBM</ListItem>
          <ListItem>GPU done, signals CPU</ListItem>
        </UnorderedList>
        <Text mb={2}><em>Step 2:</em> Run ReLU on GPU</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>CPU tells GPU</ListItem>
          <ListItem>GPU reads 50 MB from HB, applies max(0, x), writes 50 MB to HBM</ListItem>
          <ListItem>GPU done, signals CPU</ListItem>
        </UnorderedList>
        <Text mb={2}><em>Step 3:</em> Run Pool on GPU</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>CPU tells GPU: &quot;run pooling kernel&quot;</ListItem>
          <ListItem>GPU reads 50 MB from HBM ... writes results back...</ListItem>
        </UnorderedList>
        <Text mb={10} fontStyle="italic">and so on...</Text>

        {/* The problem with this approach */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          The problem with this approach
        </Heading>
        <Text mb={2}><strong>Problem 1: Kernel launch overhead</strong></Text>
        <Text mb={4}>
          Each CPU transfer to GPU takes ~5 to 10 microseconds and having 100s of operations,
          we get operation overhead
        </Text>
        <Text mb={2}><strong>Problem 2: Memory Kernel</strong></Text>
        <Text mb={4}>
          Conv writes 50 MB to HBM and then again reads again and then again writes back
          again. This is waste of bandwidth
        </Text>
        <Text mb={2}><strong>Problem 3: No Global View</strong></Text>
        <Text mb={10}>
          Pytorch executes one op at a time. It doesn&apos;t &quot;see&quot; the whole picture which can avoid
          multiple HBM transfers
        </Text>

        {/* "Compiling" a Neural Network */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          &quot;Compiling&quot; a Neural Network
        </Heading>
        <Text mb={4}>
          A ML compiler takes this entire computation graph and translate it into an optimized
          execution plan, solving all above three problems
        </Text>
        <Text mb={2}><em>Before</em></Text>
        <Text mb={4}>
          For above all the steps 5 kernels, 5 round trips through HBM
        </Text>
        <Text mb={2}><em>After</em></Text>
        <CodeBlock>
{`FusedConvReLUPool   (One kernel, intermediate data in registers)
FusedFCSoftmax      (One kernel, intermediate data in registers)`}
        </CodeBlock>
        <Text mb={4}>
          2 kernels, 2 round trips through HBM
        </Text>
        <Text mb={10}>
          <strong>The compiler sees the whole graph and makes global decisions that no single operation
          could make on its time</strong>
        </Text>

        {/* Compiling for GPU */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          Compiling for GPU
        </Heading>
        <Text mb={4}>
          GPU doesn&apos;t understand Python or PyTorch. It doesn&apos;t even understand CUDA C++. Then what
          does it actually understand? This is not an easy answer. Let&apos;s first understand the flow.
        </Text>
        <Text mb={2}>GPU chip actually executes: <Code>SASS</Code> (Shader Assembly)</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Binary Machine code: Specific to the each GPU model</ListItem>
          <ListItem>Example: <Code>FFMA</Code></ListItem>
        </UnorderedList>
        <Text mb={2}>Humans can write: <Code>PTX</Code> (Parallel Thread Execution)</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>This is still low-level but doable</ListItem>
        </UnorderedList>
        <Text mb={2}>Programmers usually write: <Code>CUDA C++</Code></Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>C++ with GPU Extensions</ListItem>
        </UnorderedList>
        <Text mb={4}>
          ML Engineers (like me) are more lazier and write Python (PyTorch / TensorFlow)
        </Text>
        <Text mb={2}>The full compilation guide:</Text>
        <CodeBlock>
{`Python (PyTorch)
  -> Framework layer (torch.compile / TensorRT)
  -> Computation Graph IR (Internal representation)
  -> Graph Optimization (fusion, layer)
  -> Optimized Graph
  -> Lowering (map ops to GPU Kernels)
  -> CUDA Kernels / Triton Kernels
  -> nvcc compiler / Triton kernels
  -> PTX (virtual GPU assembly)
  -> ptxas assembler
  -> SASS
  -> GPU Driver
  -> Transistors switch on and off`}
        </CodeBlock>
        <Text mb={10}>
          <u>Each step is a compiler</u> and there are whole stacks of compilers translating one level to
          another
        </Text>

        {/* What decisions does compilers make? */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          What decisions does compilers make?
        </Heading>
        <Text mb={2}><u>Graph Level (tensorRT, torch.compile)</u></Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Which operations to fuse together?</ListItem>
          <ListItem>What data layout to use? (NCHW / NHWC)</ListItem>
          <ListItem>What precision? (FP16, FP32)</ListItem>
          <ListItem>What order to execute operations? (minimize memory)</ListItem>
        </UnorderedList>
        <Text mb={2}><u>Kernel Level (CUDA/Triton)</u></Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>How many threads per block?</ListItem>
          <ListItem>How to tile the computation?</ListItem>
          <ListItem>What goes in shared memory vs registers?</ListItem>
          <ListItem>How to schedule instructions?</ListItem>
        </UnorderedList>
        <Text mb={2}><u>Machine Level (PTX -&gt; SASS)</u></Text>
        <UnorderedList mb={10} spacing={2}>
          <ListItem>Which physical registers to assign</ListItem>
          <ListItem>Instruction scheduling (reorder to avoid pipeline stalls)</ListItem>
          <ListItem>Target specific optimizations (Tensor Core Instruction Selection)</ListItem>
        </UnorderedList>

        {/* ML Inference Compiler */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          ML Inference Compiler
        </Heading>
        <Text mb={10}>
          An inference compiler like TensorRT takes a trained model and produces fastest possible
          execution plan. Here is the list of operation it performs
        </Text>

        {/* Operator Fusion */}
        <Heading as="h3" size="sm" mt={8} mb={3}>
          <u>Operator Fusion</u> (Dont go to warehouse directly)
        </Heading>
        <Text mb={2}><em>Before Fusion</em></Text>
        <CodeBlock>
{`Conv -> ReLU`}
        </CodeBlock>
        <Text mb={4}>
          Each will read and then write to HBM and suppose you have 50 MB of data. That would make it
          200 MB of intermediate read/write
        </Text>
        <Text mb={2}><em>After Fusion</em></Text>
        <Text mb={4}>
          Intermediate steps doesn&apos;t leave
        </Text>
        <Text mb={4}>
          Conv + ReLU acts as one block and you get now just 100 MB of read/write
        </Text>
        <Text mb={6}>
          <u>2x less memory traffic -&gt; roughly 2x faster</u> (since these are memory bound)
        </Text>

        <Text mb={4} fontStyle="italic">How to choose what to fuse and what not to</Text>
        <Text mb={2}><strong>CAN fuse:</strong></Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Elementwise ops in sequence (ReLU, Add, Multiply, Sigmoid)
            <UnorderedList mt={1} spacing={2}>
              <ListItem>Each element is independent, so feasible</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>Reduction followed by elementwise (MatMul -&gt; BiasAdd -&gt; ReLU)
            <UnorderedList mt={1} spacing={2}>
              <ListItem>Apply Bias and ReLU inside the matmul&apos;s innermost</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>The Flash Attention pattern</ListItem>
        </UnorderedList>
        <Text mb={2}><strong>CANNOT fuse</strong></Text>
        <UnorderedList mb={10} spacing={2}>
          <ListItem>Two large Matmuls back to back
            <UnorderedList mt={1} spacing={2}>
              <ListItem>Each needs the full result of the previous one before starting</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>Operations with different parallelism patterns
            <UnorderedList mt={1} spacing={2}>
              <ListItem>Reduction along x axis and followed by reduction along the y axis</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>When the intermediate tensor is needed elsewhere in the graph
            <UnorderedList mt={1} spacing={2}>
              <ListItem>If another operation also reads Conv, then intermediate results can&apos;t workout</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>

        {/* Precision Selection */}
        <Heading as="h3" size="sm" mt={8} mb={3}>
          <u>Precision Selection</u> (Use smaller numbers when possible)
        </Heading>
        <CodeBlock>
{`FP32 (32-bit float) = 3.4 x 10^7 ~ 7 decimal digits of precision
FP16 (16-bit float) = 64,504 ~ 3.3 decimal digits
INT8 (8-bit int)    = -128 to 127, no decimals
FP4  (4-bit float)  = ~1 digit precision`}
        </CodeBlock>
        <Text mb={2}>Memory footprint:</Text>
        <CodeBlock>
{`FP32:  1.0x (baseline)
FP16:  0.5x
INT8:  0.25x
FP4:   0.125x`}
        </CodeBlock>
        <Text mb={2}>Tensor Core Throughput (H100)</Text>
        <CodeBlock>
{`FP32:  495 TFLOPs
FP16:  990 TFLOPs
INT8:  1979 TFLOPs
FP4:   3958 TFLOPs`}
        </CodeBlock>
        <Text mb={4}>
          <u>Using FP16 instead of FP32 = 2x less memory = 2x faster compute = 4x speedup</u>
        </Text>
        <Text mb={4}>
          Compiler&apos;s job is to figure out which operations can safely lower without ruining the model&apos;s
          accuracy
        </Text>
        <Text mb={4}>
          But the tricky part is the <Code>CALIBRATION</Code>
        </Text>
        <Text mb={2}>Neural Network can have different ranges in different layers:</Text>
        <CodeBlock>
{`Layer 1 outputs: values between 0.5 to -0.5
Layer 2 outputs: values between -1000 to 1000`}
        </CodeBlock>
        <Text mb={4}>
          But INT8 only can represent the values between -128 and 127.
          Therefore we need to use a <Code>SCALE FACTOR</Code> which can scale both layer outputs
        </Text>
        <Text mb={10}>
          The compiler runs a <Code>CALIBRATION DATASET</Code> through the model, records min/max values at
          each layer and computes scale factors. This is called <u>Post training Quantization</u>
        </Text>

        {/* Layout Optimization */}
        <Heading as="h3" size="sm" mt={8} mb={3}>
          <u>Layout Optimization</u> (Organise the warehouse for faster picking)
        </Heading>
        <Text mb={4}>Same data, different arrangements in memory</Text>
        <Text mb={2}>A 2 x 3 matrix</Text>
        <CodeBlock>
{`[[1 2 3
  4 5 6]]`}
        </CodeBlock>
        <Text mb={2}><strong>Row major:</strong></Text>
        <CodeBlock>
{`Memory: [1 2 3 4 5 6]
To read row 0: addresses 0, 1, 2 (contiguous: fast)
To read col 0: addresses 0, 3 (not contiguous: slow)
Pytorch, C, default`}
        </CodeBlock>
        <Text mb={2}><strong>Column major:</strong></Text>
        <CodeBlock>
{`Memory: [1 4 2 5 3 6]
To read col 0: addresses 0, 1 (contiguous: fast)
To read row 0: addresses 0, 2, 4 (not contiguous: slow)
Fortran`}
        </CodeBlock>
        <Text mb={2}>For images in neural networks,</Text>
        <Text mb={2}><strong>NCHW:</strong> Batch x Channels x Height x Width</Text>
        <CodeBlock>
{`Memory: all pixels of channel 0, then all pixels of channel 1, ...
Good for: operations that process one channel at a time`}
        </CodeBlock>
        <Text mb={2}><strong>NHWC:</strong> Batch x Height x Width x Channels</Text>
        <CodeBlock>
{`Memory: all channels of pixel (0, 0), then all channels of pixel (0, 1) ...
Good for: Tensor Cores (which can process across channels)`}
        </CodeBlock>
        <Text mb={10}>
          The compiler chooses the layout that minimizes expensive reformatting and maximises
          hardware utilization (Tensor Cores prefer NHWC)
        </Text>

        {/* Memory Planning */}
        <Heading as="h3" size="sm" mt={8} mb={3}>
          <u>Memory Planning</u> Don&apos;t Rent more space than you need
        </Heading>
        <Text mb={4}>
          GPU has 80 GB of HBM. A model has more intermediate tensors.
          Not all tensors are alive at the same time.
        </Text>
        <Text mb={2}>Timeline:</Text>
        <CodeBlock>
{`t = 0: Tensor A created (100 MB)
t = 1: Tensor B created (200 MB), A still need
t = 2: Tensor C created (150 MB), A freed
t = 0: Tensor D created (100 MB). B freed
t = 0: C and D consumed, both freed`}
        </CodeBlock>
        <CodeBlock>
{`Without planning: allocate = 100 + 200 + 150 + 100 = 550 MB
With planning:    Peak = 300 MB`}
        </CodeBlock>
        <Text mb={10}>
          The compiler does something called <u>liveness analysis</u> on the computation graph, tracking
          exactly when each tensor is first produced and last consumed then packs tensor memory
          allocation to minimize peak usage
        </Text>

        {/* Kernel Selection / Auto-Tuning */}
        <Heading as="h3" size="sm" mt={8} mb={3}>
          <u>Kernel Selection / Auto - Tuning</u>: Pick up the best tool
        </Heading>
        <Text mb={4}>
          For same operation (for ex: Conv), there are multiple possible algorithms:
        </Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Algorithm 1: Direct Convolution: Simple, works for all</ListItem>
          <ListItem>Algorithm 2: im2col + GEMM:
            <UnorderedList mt={1} spacing={2}>
              <ListItem>Convert convolution to matrix multiply</ListItem>
              <ListItem>Fast for large channels, wastes memory for the im2col buffer</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
        <Text mb={10}>
          <u>TensorRT&apos;s approach: For each approach in the graph, TensorRT benchmarks ALL valid
          algorithms on the target GPU and picks up the fastest.</u> That is the reason it takes so much time.
        </Text>

        {/* Why compiling ML Workloads is Hard */}
        <Heading as="h2" size="md" mt={14} mb={5}>
          Why compiling ML Workloads is Hard
        </Heading>

        <Text mb={2}><strong>Hard Problem 1: Fusion Search Space is Enormous</strong></Text>
        <Text mb={2}>Given a graph with 100 operations</Text>
        <UnorderedList mb={6} spacing={2}>
          <ListItem>Any subset of operations MIGHT be feasible</ListItem>
          <ListItem>This is NP-hard problem</ListItem>
          <ListItem>Compiler uses heuristics but dont always find the best solution</ListItem>
        </UnorderedList>

        <Text mb={2}><strong>Hard Problem 2: Tiling is a Multi-Dimensional Optimization</strong></Text>
        <Text mb={2}>A matrix multiply: <Code>C[M, N] = A[M, K] x B[K, N]</Code></Text>
        <Text mb={2}>To tile for the GPU:</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Choose TILE_M: How many rows of C per thread block</ListItem>
          <ListItem>Choose TILE_N: How many columns?</ListItem>
          <ListItem>Choose TILE_K: How deep is the reduction stage?</ListItem>
          <ListItem>Choose # warps</ListItem>
          <ListItem>Choose number of pipeline stages</ListItem>
        </UnorderedList>
        <Text mb={2}>Each combination has different:</Text>
        <UnorderedList mb={6} spacing={2}>
          <ListItem>Shared memory usage</ListItem>
          <ListItem>Register usage</ListItem>
          <ListItem>Memory access patterns</ListItem>
          <ListItem>Compute/Memory ratio</ListItem>
        </UnorderedList>

        <Text mb={2}><strong>Hard Problem 3: Dynamic Shapes</strong></Text>
        <Text mb={2}>STATIC shapes (easy for compiler):</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Input is always [batch = 32, channels = 3, height = 224, width = 224]</ListItem>
          <ListItem>Compiler optimizes once, runs forever</ListItem>
        </UnorderedList>
        <Text mb={2}>DYNAMIC shapes (hard for compiler):</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>LLM input</ListItem>
          <ListItem>Batch size changes based on load</ListItem>
          <ListItem>Image resolution varies</ListItem>
        </UnorderedList>
        <Text mb={2}>Why this is hard:</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>Optimal tile sizes depend on tensor dimension</ListItem>
          <ListItem>Memory planning depends on tensor sizes</ListItem>
          <ListItem>Fusion depends on shapes</ListItem>
        </UnorderedList>
        <Text mb={2}>Solution:</Text>
        <UnorderedList mb={6} spacing={2}>
          <ListItem>Shape bucketing: compile for [128, 256, 512, 1024, ...] and round up to nearest</ListItem>
          <ListItem>Shape specialisation: JIT-compile is a new kernel where new shape appears</ListItem>
        </UnorderedList>

        <Text mb={2}><strong>Hard Problem 4: Hardware keeps changing</strong></Text>
        <CodeBlock>
{`A100 (2020)
H100 (2022)
B200 (2024)`}
        </CodeBlock>
        <Text mb={2}>Each generation changes:</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>What instructions are available</ListItem>
          <ListItem>What tile sizes are efficient</ListItem>
          <ListItem>How memory saves</ListItem>
          <ListItem>What precision is supported</ListItem>
        </UnorderedList>
        <Text mb={6}>
          The compiler must be retargeted for each GPU generation. Often, the SAME neural network
          needs a completely different compilation strategy on A100 vs H100 vs B200
        </Text>

        <Text mb={2}><strong>Hard Problem 5: Correctness under Approximation</strong></Text>
        <CodeBlock>
{`(a + b) + c != a + (b + c) in floating point`}
        </CodeBlock>
        <Text mb={2}>When you change precision (FP32 -&gt; FP16 -&gt; INT8):</Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>You lose numerical precision</ListItem>
          <ListItem>Errors accumulate</ListItem>
        </UnorderedList>
        <Text mb={6}>
          The compiler must ensure that these numerical differences dont make model give WRONG
          answers.
        </Text>

        <Text mb={2}><strong>Hard Problem 6: Multi-Device Compilation (For LLMs)</strong></Text>
        <Text mb={4}>
          A 70B parameter model at FP16 = 140 GB. A GPU usually can hold 80 GB. Therefore we need to:
        </Text>
        <UnorderedList mb={4} spacing={2}>
          <ListItem>PARTITION</ListItem>
          <ListItem>INSERT communication operations</ListItem>
          <ListItem>OVERLAP communication with computation</ListItem>
          <ListItem>BALANCE the overload</ListItem>
        </UnorderedList>
        <Text mb={10}>
          This is essentially a distributed systems scheduling problem and that is where I lose my shit!
        </Text>
      </Box>
    </>
  );
}
