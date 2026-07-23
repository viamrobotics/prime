---
paths:
  - '**/*.go'
---

# Go

Follow [Effective Go](https://go.dev/doc/effective_go) and [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments).

## RPC / Service Handler Pattern

Follow **Validate → Execute → Respond** for all service methods:

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

- Wrap errors with context: `fmt.Errorf("loading entity %s: %w", id, err)`
- Use `errors.Is` / `errors.As` — never string-match error messages.
- Define sentinel errors as package-level vars: `var ErrNotFound = errors.New("not found")`
- Return Connect status codes from handlers, not raw Go errors.

## Dependency Injection

Define narrow interfaces and verify compliance at compile time:

```go
var _ drawv1connect.DrawServiceHandler = (*drawServer)(nil)
```

## Logging

Use the stdlib `log` package (`log.Printf`, `log.Fatal`) — no third-party logging libraries.

## Concurrency

- All public entry points accept `context.Context`; propagate it and cancel on shutdown.
- Guard shared state with a mutex or channel — pick one per type, don't mix.
- Never leave goroutines running without a shutdown path; tie lifetimes to a context.

## Verify Your Work

```
go vet ./...
go test ./draw/... -count=1
go test ./client/... -count=1
golangci-lint run ./draw/... ./client/...
```
