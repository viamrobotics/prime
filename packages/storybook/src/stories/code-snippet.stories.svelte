<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { CodeSnippet } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/CodeSnippet" />

<Story name="JavaScript">
  <CodeSnippet
    language="javascript"
    code={`
/**
 * Logs a hello world statement to the console.
 */
function logHelloWorld() {
    console.log("Hello, World!");
}
  
// Usage Example
logHelloWorld();
     `.trim()}
  />
</Story>

<Story name="TypeScript">
  <CodeSnippet
    language="typescript"
    code={`
/**
 * Logs a hello world statement.
 */
function logHelloWorld(): void {
    console.log("Hello, world!");
}

// Usage example
logHelloWorld(); // Outputs: Hello, world!
     `.trim()}
  />
</Story>

<Story name="Golang">
  <CodeSnippet
    language="go"
    code={`
package main
  
import "fmt"
  
// LogHelloWorld logs a hello world statement to the console.
//
// Parameters:
// None
//
// Returns:
// None
func LogHelloWorld() {
  fmt.Println("Hello, World!")
}
  
func main() {
  LogHelloWorld()
}
     `.trim()}
  />
</Story>

<Story name="Python">
  <CodeSnippet
    language="python"
    code={`
def log_hello_world():
    """
    Logs a hello world statement to the console.

    This function prints the string "Hello, World!" to the console.

    Parameters:
    - None

    Returns:
    - None
    """

    # Printing the hello world statement
    print("Hello, World!")

# Example usage of the log_hello_world function
log_hello_world()
     `.trim()}
  />
</Story>

<Story name="CPlusPlus">
  <CodeSnippet
    language="cpp"
    dependencies={['c']}
    code={`
#include <iostream>

/**
* @brief Logs a "Hello, World!" statement to the console.
*/
void logHelloWorld() {
    std::cout << "Hello, World!" << std::endl;
}

int main() {
    logHelloWorld();
    return 0;
}
     `.trim()}
  />
</Story>

<Story name="Dart">
  <CodeSnippet
    language="dart"
    code={`
// This function logs a "Hello, World!" statement to the console.
//
// - Parameters: None
// - Returns: None
void logHelloWorld() {
  print('Hello, World!');
}

// Usage example
void main() {
  logHelloWorld();  // Expected output: Hello, World!
}
     `.trim()}
  />
</Story>

<Story name="Rust">
  <CodeSnippet
    language="rust"
    code={`
// Function to log a hello world statement.
// This function takes no parameters and returns nothing.
fn log_hello_world() {
    // Print the hello world statement to the console.
    println!("Hello, world!");
}

// Usage example for the log_hello_world function.
fn main() {
    // Call the log_hello_world function to log the hello world statement.
    log_hello_world();
}
     `.trim()}
  />
</Story>
