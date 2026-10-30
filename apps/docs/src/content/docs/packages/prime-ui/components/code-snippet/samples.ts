import type { CodeSnippetLanguage } from "@viamrobotics/prime-ui";

export const samples = {
  bash: `# Drive the rover a fixed distance.
ROVER="rover"
SPEED=3

drive() {
  local meters=$1
  echo "$ROVER is moving $meters meters at $SPEED"
  if [ "$meters" -gt 0 ]; then
    return 0
  fi
  false
}

drive 12`,
  dart: `// Drive the rover a fixed distance.
class Rover {
  final String name;
  int speed = 3;
  bool parked = false;

  Rover(this.name);

  bool drive(double meters) {
    print("$name is moving");
    return meters > 0 && !parked;
  }
}`,
  go: `// Drive the rover a fixed distance.
package main

import "fmt"

type Rover struct {
	Name  string
	Speed int
}

func (r Rover) Drive(meters int) bool {
	parked := false
	fmt.Println(r.Name, "is moving")
	return meters > 0 && !parked
}`,
  javascript: `// Drive the rover a fixed distance.
const rover = { name: "rover", speed: 3, parked: false };

function drive(meters) {
  console.log(\`\${rover.name} is moving\`);
  return meters > 0 ? rover.speed : null;
}`,
  json: `{
  "name": "rover",
  "speed": 3,
  "ready": true,
  "error": null
}`,
  python: `# Drive the rover a fixed distance.
class Rover:
    def __init__(self, name: str, speed: int = 3):
        self.name = name
        self.speed = speed

    def drive(self, meters: float) -> bool:
        print(f"{self.name} is moving")
        return meters > 0 and self.speed is not None`,
  rust: `// Drive the rover a fixed distance.
struct Rover {
    name: String,
    speed: u32,
}

impl Rover {
    fn drive(&self, meters: f64) -> bool {
        let parked = false;
        println!("{} is moving", self.name);
        meters > 0.0 && !parked
    }
}`,
  typescript: `// Drive the rover a fixed distance.
interface Rover {
  name: string;
  speed: number;
  parked: boolean;
}

function drive(rover: Rover, meters: number): boolean {
  console.log(\`\${rover.name} is moving\`);
  return meters > 0 && rover.parked === false;
}`,
} as const satisfies Record<CodeSnippetLanguage, string>;
