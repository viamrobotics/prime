<script lang="ts">
import {
  Badge,
  Breadcrumbs,
  Button,
  IconButton,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  FloatingMenu,
  Icon,
  Label,
  Banner,
  Input,
  Pill,
  Switch,
  Radio,
  Tabs,
  Tooltip,
  TooltipContainer,
  TooltipTarget,
  TooltipText,
  TextInput,
  NumericInput,
  RestrictedTextInput,
  SliderInput,
  VectorInput,
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableHeader,
  TableRow,
  ToggleButtons,
  Select,
  SearchableSelect,
  Multiselect,
  NotificationContainer,
  provideNotify,
  useNotify,
  Modal,
  CodeSnippet,
  RangeInput,
} from '$lib';
import { uniqueId } from 'lodash';

provideNotify();

let buttonClickedTimes = 0;
let preventHandlerDisabled = true;
let modalOpen = false;
let floatingMenuOpen = false;

const handleTogglePreventHandler = (event: CustomEvent<boolean>) => {
  preventHandlerDisabled = event.detail;
};

const handleCloseModal = () => {
  modalOpen = false;
};

const handleOpenModal = () => {
  modalOpen = true;
};

const handleFloatingMenuChange = (isOpen: boolean) => {
  floatingMenuOpen = isOpen;
};

const notify = useNotify();

let restrictedValue = '';

const restrictInput = (inputValue: string) =>
  inputValue
    .replaceAll(/\s/gu, '-')
    .replaceAll('%', '$')
    .replaceAll(/[^a-z0-9-$]/gu, '');

const handleCodeSnippetCopy = ({
  detail: { succeeded, message },
}: CustomEvent<{ succeeded: boolean; message: string }>) => {
  if (succeeded) {
    notify.success(message);
  } else {
    notify.danger(message);
  }
};

let jsonSnippet = `
[{
  "id": 1,
  "first_name": "Beatrice",
  "last_name": "Earwicker",
  "email": "bearwicker0@washington.edu",
  "gender": "Female",
  "ip_address": "180.7.54.35"
}, {
  "id": 2,
  "first_name": "Linnell",
  "last_name": "Juhruke",
  "email": "ljuhruke1@newyorker.com",
  "gender": "Female",
  "ip_address": "57.19.218.117"
}, {
  "id": 3,
  "first_name": "Mathew",
  "last_name": "Abramovic",
  "email": "mabramovic2@miibeian.gov.cn",
  "gender": "Male",
  "ip_address": "46.0.113.0"
}]`.trim();

const jsSnippet = `
/**
 * Function that implements the FizzBuzz algorithm.
 *
 * @param {number} n - The number of iterations.
 * @returns {string[]} An array of strings containing the FizzBuzz sequence.
 */
function fizzBuzz(n) {
    const result = [];

    for (let i = 1; i <= n; i++) {
        let output = "";

        if (i % 3 === 0) {
            output += "Fizz";
        }

        if (i % 5 === 0) {
            output += "Buzz";
        }

        if (output === "") {
            output = i.toString();
        }

        result.push(output);
    }

    return result;
}

// Usage Example
const fizzBuzzSequence = fizzBuzz(15);
console.log(fizzBuzzSequence);`.trim();

const tsSnippet = `
/**
 * fizzBuzz: A function that implements the FizzBuzz algorithm.
 *
 * @param n - The number of iterations to perform the FizzBuzz algorithm.
 *
 * @returns {string[]} - An array of strings representing the FizzBuzz sequence.
 */
function fizzBuzz(n: number): string[] {
    const result: string[] = [];

    for (let i = 1; i <= n; i++) {
        let value = "";

        if (i % 3 === 0) {
            value += "Fizz";
        }

        if (i % 5 === 0) {
            value += "Buzz";
        }

        if (value === "") {
            value = i.toString();
        }

        result.push(value);
    }

    return result;
}

// Usage example for the fizzBuzz function.

// Example: Generating the FizzBuzz sequence for n = 15.
const sequence = fizzBuzz(15);
console.log(\`The FizzBuzz sequence for n = 15 is:\`);
console.log(sequence); // Outputs: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]`.trim();

const goSnippet = `
import "fmt"

// FizzBuzz
//
// Parameters:
// n (int): The number up to which the FizzBuzz algorithm should be applied.
//
// Returns:
// []string: A slice of strings containing the FizzBuzz results for each number from 1 to n.
func FizzBuzz(n int) []string {
  result := make([]string, n)

  for i := 1; i <= n; i++ {
    if i%3 == 0 && i%5 == 0 {
      result[i-1] = "FizzBuzz"
    } else if i%3 == 0 {
      result[i-1] = "Fizz"
    } else if i%5 == 0 {
      result[i-1] = "Buzz"
    } else {
      result[i-1] = fmt.Sprintf("%d", i)
    }
  }

  return result
}

// Usage Example for FizzBuzz

func main() {
  // Apply FizzBuzz algorithm up to 20
  fizzBuzzResult := FizzBuzz(20)

  // Print the FizzBuzz results
  for _, value := range fizzBuzzResult {
    fmt.Println(value)
  }
}`.trim();

const pythonSnippet = `
def fizzbuzz(n: int):
    """
    Function to implement the FizzBuzz algorithm.

    Parameters:
    - n: int
        The number up to which the FizzBuzz algorithm should be applied.

    Returns:
    - list:
        A list of strings representing the FizzBuzz sequence from 1 to n.

    Raises:
    - ValueError:
        Will raise an error if the input number 'n' is less than 1.
    """

    # Validating the input number
    if n < 1:
        raise ValueError("Input number should be greater than or equal to 1.")

    # Initializing an empty list to store the FizzBuzz sequence
    fizzbuzz_sequence = []

    # Looping through numbers from 1 to n (inclusive)
    for i in range(1, n+1):
        # Checking if the number is divisible by both 3 and 5
        if i % 3 == 0 and i % 5 == 0:
            fizzbuzz_sequence.append("FizzBuzz")
        # Checking if the number is divisible by 3
        elif i % 3 == 0:
            fizzbuzz_sequence.append("Fizz")
        # Checking if the number is divisible by 5
        elif i % 5 == 0:
            fizzbuzz_sequence.append("Buzz")
        # If none of the above conditions are met, add the number itself
        else:
            fizzbuzz_sequence.append(str(i))

    return fizzbuzz_sequence

# Example usage of the fizzbuzz function
n = 20
result = fizzbuzz(n)
print(result)`.trim();

const cppSnippet = `
#include <iostream>
#include <string>

/**
 * @brief Implements the FizzBuzz algorithm.
 *
 * The FizzBuzz algorithm is a common programming task where you iterate over a range of numbers
 * and print "Fizz" for numbers divisible by 3, "Buzz" for numbers divisible by 5, and "FizzBuzz"
 * for numbers divisible by both 3 and 5. For all other numbers, the number itself is printed.
 *
 * @param n The number of iterations to perform.
 */
void fizzBuzz(int n) {
    for (int i = 1; i <= n; i++) {
        std::string output = "";

        if (i % 3 == 0) {
            output += "Fizz";
        }

        if (i % 5 == 0) {
            output += "Buzz";
        }

        if (output.empty()) {
            output = std::to_string(i);
        }

        std::cout << output << std::endl;
    }
}

int main() {
    int n = 100; // Number of iterations

    fizzBuzz(n);

    return 0;
}`.trim();

const dartSnippet = `
// This function implements the FizzBuzz algorithm.
// It takes an integer \`n\` as input and prints the numbers from 1 to \`n\`,
// replacing multiples of 3 with "Fizz", multiples of 5 with "Buzz",
// and multiples of both 3 and 5 with "FizzBuzz".
//
// - Parameters:
//   - \`n\`: The upper limit of the range of numbers to be printed.
//
// - Throws:
//   - \`ArgumentError\` if \`n\` is not a positive integer.
void fizzBuzz(int n) {
  if (n <= 0 || n % 1 != 0) {
    throw ArgumentError('n must be a positive integer.');
  }

  for (int i = 1; i <= n; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      print('FizzBuzz');
    } else if (i % 3 == 0) {
      print('Fizz');
    } else if (i % 5 == 0) {
      print('Buzz');
    } else {
      print(i);
    }
  }
}

void main() {
  // Usage Example
  fizzBuzz(15);
  // Expected output:
  // 1
  // 2
  // Fizz
  // 4
  // Buzz
  // Fizz
  // 7
  // 8
  // Fizz
  // Buzz
  // 11
  // Fizz
  // 13
  // 14
  // FizzBuzz
}`.trim();

const rustSnippet = `
// Function to implement the FizzBuzz algorithm.
// Params:
// - n: The number up to which FizzBuzz should be performed.
// Returns: None
fn fizzbuzz(n: u32) {
    // Iterate from 1 to n (inclusive).
    for i in 1..=n {
        // Check if the current number is divisible by both 3 and 5.
        if i % 3 == 0 && i % 5 == 0 {
            println!("FizzBuzz");
        }
        // Check if the current number is divisible by 3.
        else if i % 3 == 0 {
            println!("Fizz");
        }
        // Check if the current number is divisible by 5.
        else if i % 5 == 0 {
            println!("Buzz");
        }
        // If none of the above conditions are met, print the number itself.
        else {
            println!("{}", i);
        }
    }
}

// Usage example for the fizzbuzz function.
fn main() {
    fizzbuzz(20);
}`.trim();

const htmlSnippet = `
<h1>Ask her how her day was.</h1>
<p>
  Now, now. Perfectly symmetrical violence never solved anything. Meh. So, how
  'bout them Knicks? Ooh, name it after me! Whoa a real live robot; or is that
  some kind of cheesy New Year's costume?
</p>
<p>
  Well, then good news! It's a suppository. Yes! In your face, Gandhi! No! The
  cat shelter's on to me. <strong> I'm sorry, guys.</strong>
  <em> I never meant to hurt you.</em> Just to destroy everything you ever believed
  in.
</p>
<h2>Leela's gonna kill me.</h2>
<p>
  This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't
  just have your characters announce how they feel. That makes me feel angry!
  Tell them I hate them. All I want is to be a monkey of moderate intelligence
  who wears a suit… that's why I'm transferring to business school!
</p>
<ol>
  <li>
    Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble.
    But I done struck you a deal: Five hours of community service cleanin' up
    that ol' mess you caused.
  </li>
  <li>Hey! I'm a porno-dealing monster, what do I care what you think?</li>
  <li>
    It may comfort you to know that Fry's death took only fifteen seconds, yet
    the pain was so intense, that it felt to him like fifteen years. And it goes
    without saying, it caused him to empty his bowels.
  </li>
</ol>

<h3>
  For one beautiful night I knew what it was like to be a grandmother.
  Subjugated, yet honored.
</h3>
<p>
  Is today's hectic lifestyle making you tense and impatient? Now, now.
  Perfectly symmetrical violence never solved anything. Hey, whatcha watching?
  Noooooo!
</p>
<ul>
  <li>Yeah, I do that with my stupidness.</li>
  <li>But I know you in the future. I cleaned your poop.</li>
  <li>Ummm…to eBay?</li>
</ul>`.trim();
</script>

<NotificationContainer />

<div class="container mx-auto my-4 flex flex-col gap-8 p-4">
  <!-- Badge -->
  <h1 class="text-2xl">Badge</h1>
  <div>
    <Badge
      variant="inactive"
      label="Inactive"
    />
    <Badge
      variant="success"
      label="Success"
    />
    <Badge
      variant="warning"
      label="Warning"
    />
    <Badge
      variant="danger"
      label="Danger"
    />
    <Badge
      variant="neutral"
      label="Neutral"
    />
  </div>

  <!-- Banner -->
  <h1 class="text-2xl">Banner</h1>
  <div class="flex flex-col gap-4">
    <Banner variant="info">
      <svelte:fragment slot="title">This is the info title.</svelte:fragment>
    </Banner>

    <Banner variant="success">
      <svelte:fragment slot="title">This is the success title.</svelte:fragment>
    </Banner>

    <Banner
      variant="warning"
      exitable={true}
    >
      <svelte:fragment slot="title">This is the warning title.</svelte:fragment>
      <svelte:fragment slot="subtitle">This is the subtitle.</svelte:fragment>

      <svelte:fragment slot="actionEmphasize">
        <Button variant="dark">This is the action emphasized.</Button>
      </svelte:fragment>
    </Banner>

    <Banner
      variant="danger"
      progress={0.5}
    >
      <svelte:fragment slot="title">
        This is the <em>danger</em> title.
      </svelte:fragment>
      <svelte:fragment slot="subtitle">This is the subtitle.</svelte:fragment>
      <svelte:fragment slot="action">
        <a href="http://www.viam.com">This is the action link.</a>
      </svelte:fragment>
    </Banner>
  </div>

  <!-- Breadcrumbs -->
  <h1 class="text-2xl">Breadcrumbs</h1>
  <Breadcrumbs crumbs={['Chocolate Chip', 'Oatmeal Raisin']} />

  <!-- Button -->
  <h1 class="text-2xl">Button</h1>

  <div class="flex gap-4">
    <Button on:click={() => (buttonClickedTimes += 1)}>
      Clicked {buttonClickedTimes} times!
    </Button>
  </div>

  <div class="flex gap-4">
    <Button>Primary</Button>
    <Button
      disabled
      on:click={() => {
        console.log('Uh oh, should not be called!');
      }}
    >
      Disabled
    </Button>

    <Button variant="dark">Dark</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="success">Success</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="outline-danger">Outline Danger</Button>
  </div>

  <div class="flex gap-4">
    <Button icon="camera-outline">Primary</Button>
    <Button
      disabled
      icon="cog"
      on:click={() => {
        // eslint-disable-next-line no-console
        console.log('Uh oh, should not be called!');
      }}
    >
      Disabled
    </Button>

    <Button
      variant="dark"
      icon="magnify">Dark</Button
    >
    <Button
      variant="ghost"
      icon="credit-card-outline">Ghost</Button
    >
    <Button
      variant="success"
      icon="earth">Success</Button
    >
    <Button
      variant="danger"
      icon="download">Danger</Button
    >
    <Button
      variant="outline-danger"
      icon="broadcast">Outline Danger</Button
    >
  </div>

  <Button width="full">Full Width</Button>

  <!-- IconButton -->
  <h2 class="text-xl">IconButton</h2>

  <div class="flex-start gap-4">
    <IconButton
      label="close"
      icon="close"
    />
    <IconButton
      icon="close"
      variant="danger"
      label="Click me"
      on:click={() => {
        // eslint-disable-next-line no-console
        console.log('closed!');
      }}
    />
    <IconButton
      icon="close"
      label="Click me"
      disabled
      on:click={() => {
        // eslint-disable-next-line no-console
        console.log('Uh oh, should not be called!');
      }}
    />
  </div>

  <!-- Code Snippet -->
  <h1 class="text-2xl">Code Snippet</h1>
  <p>
    Uses <a href="https://prismjs.com/">prismjs</a> for syntax highlighting.
  </p>

  <h2 class="text-lg text-subtle-1">JSON</h2>
  <Label
    position="top"
    cx="w-full"
  >
    JSON Snippet
    <textarea
      slot="input"
      class="text-small min-h-[200px] font-roboto-mono"
      bind:value={jsonSnippet}
    />
  </Label>
  <CodeSnippet
    language="json"
    code={jsonSnippet}
    on:copy={handleCodeSnippetCopy}
  >
    <svelte:fragment slot="caption">
      Edit the JSON in the <code>textarea</code> above to see it rendered here!
    </svelte:fragment>
  </CodeSnippet>

  <h2 class="text-lg text-subtle-1">JavaScript</h2>
  <CodeSnippet
    language="javascript"
    code={jsSnippet}
  />

  <h2 class="text-lg text-subtle-1">Typescript</h2>
  <CodeSnippet
    language="typescript"
    code={tsSnippet}
  />

  <h2 class="text-lg text-subtle-1">Go</h2>
  <CodeSnippet
    language="go"
    code={goSnippet}
  />

  <h2 class="text-lg text-subtle-1">Python</h2>
  <CodeSnippet
    language="python"
    code={pythonSnippet}
  />

  <h2 class="text-lg text-subtle-1">C++</h2>
  <CodeSnippet
    language="cpp"
    code={cppSnippet}
    dependencies={['c']}
  />

  <h2 class="text-lg text-subtle-1">Dart</h2>
  <CodeSnippet
    language="dart"
    code={dartSnippet}
  />

  <h2 class="text-lg text-subtle-1">Rust</h2>
  <CodeSnippet
    language="rust"
    code={rustSnippet}
  />

  <h2 class="text-lg text-subtle-1">HTML</h2>
  <CodeSnippet
    language="html"
    code={htmlSnippet}
  />

  <!-- Context Menu -->
  <h1 class="text-2xl">Context Menu</h1>
  <div class="flex items-start gap-4">
    <ContextMenu id={uniqueId('context-menu')}>
      <ContextMenuItem>label 1</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="primary">label 2</ContextMenuItem>
      <ContextMenuItem icon="trash-can-outline">label 3</ContextMenuItem>
      <ContextMenuItem
        icon="close"
        variant="danger"
        on:click={() => {
          // eslint-disable-next-line no-console
          console.log('oh no');
        }}
      >
        danger
      </ContextMenuItem>
    </ContextMenu>

    <FloatingMenu
      isOpen={floatingMenuOpen}
      placement="right-start"
      offset={4}
      onChange={handleFloatingMenuChange}
    >
      <svelte:fragment slot="control">
        {floatingMenuOpen ? 'Close menu' : 'Open menu'}
      </svelte:fragment>
      <svelte:fragment slot="items">
        <ContextMenuItem>label 1</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="primary">label 2</ContextMenuItem>
        <ContextMenuItem icon="trash-can-outline">label 3</ContextMenuItem>
        <ContextMenuItem
          icon="close"
          variant="danger"
          on:click={() => console.log('oh no')}
        >
          danger
        </ContextMenuItem>
      </svelte:fragment>
    </FloatingMenu>
  </div>

  <!-- Icon -->
  <h1 class="text-2xl">Icon</h1>
  <div class="flex gap-4">
    <p class="text-danger-dark">
      <Icon
        name="cog"
        size="xs"
      />
    </p>

    <p class="text-warning-bright">
      <Icon
        name="cog"
        size="sm"
      />
    </p>

    <p class="text-danger-dark">
      <Icon
        name="cog"
        size="base"
      />
    </p>

    <p class="text-warning-bright">
      <Icon
        name="cog"
        size="lg"
      />
    </p>

    <p class="text-danger-dark">
      <Icon
        name="cog"
        size="xl"
      />
    </p>

    <p class="text-warning-bright">
      <Icon
        name="cog"
        size="2xl"
      />
    </p>

    <p class="text-danger-dark">
      <Icon
        name="cog"
        size="3xl"
      />
    </p>

    <p class="text-warning-bright">
      <Icon
        name="cog"
        size="4xl"
      />
    </p>

    <Icon
      name="package-variant-closed"
      size="4xl"
    />
    <div class="hover:animate-spin">
      <Icon
        name="lock"
        size="4xl"
      />
    </div>
    <Icon
      name="earth"
      size="4xl"
    />
  </div>

  <!-- Input -->
  <h1 class="text-2xl">Input</h1>

  <div class="flex gap-4">
    <Input
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('Input input', event);
      }}
      name="name"
      placeholder="Enter your name"
    />

    <Input
      name="readonly"
      value="Readonly Input"
      readonly
    />

    <Input
      name="disabled"
      value="Disabled Input"
      disabled
    />
  </div>

  <div class="flex gap-4">
    <Input
      name="info"
      value="Info State"
      state="info"
    />
    <Input
      name="warn"
      value="Warn State"
      state="warn"
    />
    <Input
      name="error"
      value="Error State"
      state="error"
    />
  </div>

  <!-- Text Input -->
  <h2 class="text-xl">Text Input</h2>

  <div class="flex gap-4">
    <TextInput
      name="name"
      placeholder="Enter your name"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('TextInput input', event);
      }}
    />

    <TextInput
      type="email"
      name="email"
      placeholder="Enter your email"
    />

    <TextInput
      type="password"
      name="password"
      placeholder="Enter your password"
    />
  </div>

  <!-- Restricted Text Input -->
  <h2 class="text-xl">Restricted Text Input</h2>

  <div class="flex gap-4">
    <RestrictedTextInput
      name="namespace"
      placeholder="Enter your money namespace"
      bind:value={restrictedValue}
      tooltipDescription="Valid characters: numbers, lowercase letters, dashes, dolla $ign"
      {restrictInput}
      inputCX="min-w-[300px]"
    />
  </div>

  <!-- Numeric Input -->
  <h2 class="text-xl">Numeric Input</h2>
  <div class="flex gap-4">
    <NumericInput
      name="number"
      placeholder="Enter a number"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('NumericInput input', event);
      }}
    />

    <NumericInput
      type="integer"
      name="integer"
      placeholder="Enter an integer"
    />
  </div>

  <!-- Slider Input -->
  <h2 class="text-xl">Slider Input</h2>
  <div class="flex gap-4">
    <SliderInput
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('SliderInput input', event);
      }}
      on:change={(event) => {
        // eslint-disable-next-line no-console
        console.log('SliderInput change', event);
      }}
      placeholder="Slide to select a number"
      name="slider"
    />

    <SliderInput
      placeholder="Readonly"
      readonly
      name="slider"
    />

    <SliderInput
      placeholder="Disabled"
      name="slider"
      disabled
    />
  </div>

  <!-- Range Input -->
  <h2 class="text-xl">Range Input</h2>
  <div class="flex flex-col gap-2">
    <RangeInput
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('RangeInput input', event);
      }}
      on:change={(event) => {
        // eslint-disable-next-line no-console
        console.log('RangeInput change', event);
      }}
      name="range"
    />

    <RangeInput
      name="disabled-range"
      disabled
    />

    <RangeInput
      name="suffix-range"
      suffix="%"
    />

    <RangeInput
      name="tiny-range"
      max={1}
      step={0.01}
    />

    <RangeInput
      name="large-range"
      max={1000}
      step={1}
    />
  </div>

  <!-- Datetime Input -->
  <h2 class="text-xl">Datetime Input</h2>
  <div class="flex gap-4">
    <Input
      type="time"
      name="time"
      placeholder="Enter a time"
    />

    <Input
      type="date"
      name="date"
      placeholder="Enter a date"
    />

    <Input
      type="datetime-local"
      name="datetime-local"
      placeholder="Enter a date and time"
    />
  </div>

  <!-- Label -->
  <h1 class="text-2xl">Label</h1>
  <div class="flex gap-4">
    <Label>
      Default
      <Input
        slot="input"
        name="name"
      />
    </Label>

    <Label required>
      Required
      <Input
        slot="input"
        name="name"
        required
      />
    </Label>

    <Label disabled>
      Disabled
      <Input
        slot="input"
        name="name"
        disabled
      />
    </Label>

    <Label detail="(detail)">
      With Detail
      <Input
        slot="input"
        name="name"
      />
    </Label>
  </div>

  <!-- Notify -->
  <h1 class="text-2xl">Notify</h1>

  <div class="flex gap-4">
    <Button on:click={() => notify.info('Info', 'Info notify')}>
      Info Notify
    </Button>
    <Button on:click={() => notify.warn('Warn', 'Warn notify')}>
      Warn Notify
    </Button>
    <Button
      variant="success"
      on:click={() => notify.success('Success', 'Success notify')}
    >
      Success Notify
    </Button>
    <Button
      variant="danger"
      on:click={() => notify.danger('Danger', 'Danger notify')}
    >
      Danger Notify
    </Button>
  </div>

  <!-- Modal -->
  <h1 class="text-2xl">Modal</h1>

  <div>
    <Button on:click={handleOpenModal}>Open Modal</Button>
    <Modal
      isOpen={modalOpen}
      on:close={handleCloseModal}
    >
      <span slot="title">This is the modal demo</span>
      <span slot="message"
        >Are you sure you want to kick off a notify toast?</span
      >
      <Button
        slot="primary"
        on:click={() => notify.success('Howdy Message', 'Howdy Partner')}
      >
        Notify howdy
      </Button>
      <Button
        slot="secondary"
        variant="dark"
        on:click={handleCloseModal}
      >
        Cancel
      </Button>
    </Modal>
  </div>

  <!-- Pill -->
  <h1 class="text-2xl">Pill</h1>
  <div class="flex gap-4">
    <Pill />
    <Pill value="Foo" />
    <Pill
      readonly
      value="Bar"
    />
    <Pill
      disabled
      value="Baz"
    />
  </div>

  <!-- Outlined Pill -->
  <h1 class="text-2xl">Outlined Pill</h1>
  <div class="flex gap-4">
    <Pill
      value="Service"
      variant="outlined"
      icon="viam-service"
      removable
    />
    <Pill
      value="Component"
      variant="outlined"
      icon="viam-component"
      removable={false}
    />
  </div>

  <!-- Prevent Handler -->

  <h1 class="text-2xl">Prevent Handler</h1>
  <div class="flex flex-col gap-4">
    <Input
      placeholder="Disable Me"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('Prevent Handler input', event);
      }}
      disabled={preventHandlerDisabled}
    />
    <Switch
      on={preventHandlerDisabled}
      annotated
      on:change={handleTogglePreventHandler}
    >
      <svelte:fragment slot="on">Enabled</svelte:fragment>
      <svelte:fragment slot="off">Disabled</svelte:fragment>
    </Switch>
  </div>

  <!-- Radio -->
  <h1 class="text-2xl">Radio</h1>

  <div class="flex gap-4">
    <Radio
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      name="radio"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('Radio input', event);
      }}
    />

    <Radio
      options={['Opt 1', 'Opt 2']}
      selected="Opt 1"
      name="preselected-radio"
    >
      <svelte:fragment slot="legend">Preselected Radio</svelte:fragment>
    </Radio>

    <Radio
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      name="required-radio"
      required
    >
      <svelte:fragment slot="legend">Required Radio</svelte:fragment>
    </Radio>

    <Radio
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      name="disabled-radio"
      disabled
    >
      <svelte:fragment slot="legend">Disabled Radio</svelte:fragment>
    </Radio>

    <Radio
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      name="row-radio"
      direction="row"
    >
      <svelte:fragment slot="legend">Row Radio</svelte:fragment>
    </Radio>
  </div>

  <!-- Select -->
  <h1 class="text-2xl">Select</h1>

  <div class="flex gap-4">
    <Select
      on:change={(event) => {
        // eslint-disable-next-line no-console
        console.log('Select input', event);
      }}
    >
      <option>This thing</option>
      <option>That thing</option>
      <option>The other thing</option>
      <optgroup label="The other things">
        <option>This other thing</option>
        <option>That other thing</option>
        <option>The other other thing</option>
      </optgroup>
    </Select>

    <Select disabled={preventHandlerDisabled}>
      <option selected>Disabled select</option>
      <option>That thing</option>
      <option>The other thing</option>
    </Select>
  </div>

  <div class="flex gap-4">
    <Select state="warn">
      <option selected>Warn state</option>
      <option>That thing</option>
      <option>The other thing</option>
    </Select>

    <Select state="error">
      <option selected>Error state</option>
      <option>That thing</option>
      <option>The other thing</option>
    </Select>
  </div>

  <!-- Searchable Select -->
  <h2 class="text-xl">Searchable Select</h2>

  <div class="flex gap-4">
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Select an option"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('SearchableSelect input', event);
      }}
    />
    <SearchableSelect
      options={['First Option', 'Disabled select', 'C.) Option']}
      value="Disabled select"
      disabled
    />
    <SearchableSelect
      options={[
        'First Option',
        'Option 2',
        'C.) Option',
        'So',
        'Many',
        'More',
        'Options',
        'With A Whole Lot Of Spaces',
      ]}
      placeholder="Reducing Select"
      sort="reduce"
    />
  </div>

  <div class="flex gap-4">
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Warn state"
      state="warn"
    />
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Error state"
      state="error"
    />
  </div>

  <div class="flex gap-4">
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="With a button"
      button={{ text: 'Other', icon: 'information-outline' }}
    />
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="With a heading"
      heading="Some heading text"
    />
  </div>

  <!-- Multiselect -->
  <h2>Multiselect</h2>
  <div class="flex gap-4">
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Select an option"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('Multiselect input', event);
      }}
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      selected={['Option 2']}
      placeholder="Disabled select"
      disabled
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      selected={['Option 2']}
      placeholder="Preselected option"
    />
  </div>

  <div class="flex gap-4">
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Warn state"
      state="warn"
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Error state"
      state="error"
    />
  </div>

  <div class="flex gap-4">
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="With a button"
      button={{ text: 'Other', icon: 'information-outline' }}
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="With a heading"
      heading="Some heading text"
    />
  </div>

  <div class="flex gap-4">
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Clearable"
      clearable
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="No pills"
      showPills={false}
    />
  </div>

  <!-- Switch -->
  <h1 class="text-2xl">Switch</h1>
  <div class="flex gap-4">
    <Switch
      on:toggle={(event) => {
        // eslint-disable-next-line no-console
        console.log('Switch toggle', event);
      }}
    />

    <Switch on />

    <Switch
      on
      annotated
    />

    <Switch
      on
      annotated
      disabled
    />

    <Switch on>
      <svelte:fragment slot="on">Enabled</svelte:fragment>
      <svelte:fragment slot="off">Disabled</svelte:fragment>
    </Switch>
  </div>

  <!-- Table -->
  <h1 class="text-2xl">Table</h1>
  <Table cols={['10%', '90%']}>
    <TableHeader>
      <TableHeaderCell
        >headerheaderheader (mario underwater theme)</TableHeaderCell
      >
      <TableHeaderCell>Another header</TableHeaderCell>
    </TableHeader>
    <TableBody cx="text-center">
      <TableRow>
        <TableCell
          >the mitochondria is the powerhouse of the tablecell</TableCell
        >
        <TableCell>stuffs</TableCell>
      </TableRow>
      <TableRow variant="success">
        <TableCell>stuff</TableCell>
        <TableCell>stuffs</TableCell>
      </TableRow>
      <TableRow variant="error">
        <TableCell>stuff</TableCell>
        <TableCell>stuffs</TableCell>
      </TableRow>
      <TableRow variant="disabled">
        <TableCell>stuff</TableCell>
        <TableCell>stuffs</TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <!-- Tabs -->
  <h1 class="text-2xl">Tabs</h1>
  <div class="flex gap-4">
    <Tabs
      tabs={['Tab 1', 'Tab 2', 'Tab 3']}
      selected="Tab 1"
    />

    <Tabs
      tabs={['Tab 1', 'Tab 2', 'Tab 3']}
      selected="Tab 2"
    />

    <Tabs
      tabs={['Tab 1', 'Tab 2']}
      selected="Tab 2"
    />
  </div>

  <!-- Toggle Buttons -->
  <h1 class="text-2xl">Toggle Buttons</h1>

  <div class="flex items-end gap-4">
    <ToggleButtons
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('ToggleButtons input', event);
      }}
    />

    <ToggleButtons
      options={['Opt 1', 'Opt 2']}
      selected="Opt 1"
    >
      <svelte:fragment slot="legend">Preselected toggle</svelte:fragment>
    </ToggleButtons>

    <ToggleButtons
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      disabled
    >
      <svelte:fragment slot="legend">Disabled toggle</svelte:fragment>
    </ToggleButtons>

    <ToggleButtons
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      cx="w-full"
    >
      <svelte:fragment slot="legend">Full width</svelte:fragment>
    </ToggleButtons>
  </div>

  <!-- Tooltip -->
  <h1 class="text-2xl">Tooltip</h1>
  <div class="flex flex-wrap items-start gap-4">
    <Tooltip let:tooltipID>
      <p aria-describedby={tooltipID}>This element has a top tooltip.</p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>

    <Tooltip
      let:tooltipID
      location="left"
    >
      <p aria-describedby={tooltipID}>This element has a left tooltip.</p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>

    <Tooltip
      let:tooltipID
      location="right"
    >
      <p aria-describedby={tooltipID}>This element has a right tooltip.</p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>

    <Tooltip
      let:tooltipID
      location="bottom"
      state="visible"
    >
      <p aria-describedby={tooltipID}>
        This element has visible bottom tooltip.
      </p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>

    <div>
      <TooltipContainer let:tooltipID>
        <Label>
          This element has a tooltip on an icon!
          <TooltipTarget>
            <Icon
              tabindex="0"
              cx="cursor-pointer"
              name="information-outline"
            />
          </TooltipTarget>
          <TextInput
            slot="input"
            aria-describedby={tooltipID}
          />
        </Label>
        <TooltipText>This is the tooltip text!</TooltipText>
      </TooltipContainer>
    </div>
  </div>

  <!-- Vector Input -->
  <h1 class="text-2xl">Vector Input</h1>
  <VectorInput
    on:input={(event) => {
      // eslint-disable-next-line no-console
      console.log('VectorInput input', event);
    }}
    on:change={(event) => {
      // eslint-disable-next-line no-console
      console.log('VectorInput change', event);
    }}
  />

  <VectorInput
    type="number"
    step={10}
    labels={['x', 'y', 'z', 'w']}
    placeholders={{
      x: '0',
      y: '0',
      z: '0',
      w: '0',
    }}
    values={{
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    }}
    on:input={(event) => {
      // eslint-disable-next-line no-console
      console.log('VectorInput input', event);
    }}
  />
</div>
