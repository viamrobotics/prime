---
paths:
  - '**/*.go'
---

# Go

Follow [Effective Go](https://go.dev/doc/effective_go) and [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments).

## RPC / Service Handler Pattern

Every service method goes **Validate, Execute, Respond**:

```go
func (s *drawServer) GetEntity(ctx context.Context, req *connect.Request[drawv1.GetEntityRequest]) (*connect.Response[drawv1.GetEntityResponse], error) {
    if req.Msg.GetId() == "" {
        return nil, connect.NewError(connect.CodeInvalidArgument, errors.New("id is required"))
    }

    entity, err := s.svc.GetEntity(ctx, req.Msg.GetId())
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            return nil, connect.NewError(connect.CodeNotFound, errors.New("entity not found"))
        }
        return nil, connect.NewError(connect.CodeInternal, err)
    }

    return connect.NewResponse(&drawv1.GetEntityResponse{Entity: entityToProto(entity)}), nil
}
```

## Error Handling

- Wrap with context: `fmt.Errorf("loading entity %s: %w", id, err)`
- Use `errors.Is` and `errors.As`. Never string-match error messages.
- Sentinel errors are package-level vars: `var ErrNotFound = errors.New("not found")`
- Handlers return Connect status codes, not raw Go errors.

## Dependency Injection

Define narrow interfaces and verify compliance at compile time:

```go
var _ drawv1connect.DrawServiceHandler = (*drawServer)(nil)
```

## Doc Comments

`code-comments.md` decides _whether_ to comment. Godoc decides the shape.

- Every exported identifier gets a doc comment starting with its name, reading as a sentence: `// ParseConfig reads a manifest from disk.` Tools and `go doc` rely on that prefix.
- One package comment per package, on a single file: `// Package draw serves the drawing API.`
- Unexported identifiers follow the general rule: divergence or non-obvious domain logic only.
- Mark known gaps with `// TODO(username):` so `go vet` and reviewers find them.

```go
// EntityStore persists drawing entities. Implementations must be safe for
// concurrent use by multiple goroutines.
type EntityStore interface {
    Get(ctx context.Context, id string) (*Entity, error)
}
```

## Logging

Stdlib `log` only (`log.Printf`, `log.Fatal`). No third-party logging libraries.

## Concurrency

- Public entry points accept `context.Context`. Propagate it and cancel on shutdown.
- Guard shared state with a mutex or a channel. Pick one per type, do not mix.
- Never leave a goroutine without a shutdown path. Tie its lifetime to a context.

## Verify Your Work

```
go vet ./...
go test ./draw/... -count=1
go test ./client/... -count=1
golangci-lint run ./draw/... ./client/...
```
