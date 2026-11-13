var e={typescript:{before:`function greet(name: string) {
  return "Hello " + name;
}
`,after:'function greet(name: string, punctuation = "!") {\n  return `Hello ${name}${punctuation}`;\n}\n'},javascript:{before:`const total = items.reduce((sum, item) => sum + item.price, 0);
`,after:`const total = items
  .filter((item) => item.inStock)
  .reduce((sum, item) => sum + item.price, 0);
`},json:{before:`{
  "name": "arm",
  "model": "fake"
}
`,after:`{
  "name": "arm",
  "model": "fake",
  "attributes": { "speed": 5 }
}
`},python:{before:`def scale(values, factor):
    return [v * factor for v in values]
`,after:`def scale(values, factor=2):
    """Multiply every value by factor."""
    return [v * factor for v in values]
`},go:{before:`func Add(a, b int) int {
	return a + b
}
`,after:`func Add(a, b int) (int, error) {
	if a < 0 || b < 0 {
		return 0, errors.New("negative input")
	}
	return a + b, nil
}
`},sql:{before:`SELECT id, name FROM robots;
`,after:`SELECT id, name
FROM robots
WHERE status = 'online'
ORDER BY name;
`}};export{e as t};