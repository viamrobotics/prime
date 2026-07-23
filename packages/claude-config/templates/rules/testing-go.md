---
paths:
  - '**/*_test.go'
---

# Go Testing

Prefer tests with real dependencies over mocked ones. Mock only at I/O boundaries (network, filesystem). Each test must be fully independent — no shared mutable state.

## Assertions

Use `test.That(t, actual, matcher, ...expected)` from [`go.viam.com/test`](https://pkg.go.dev/go.viam.com/test) — not `testify`:

```go
import "go.viam.com/test"

test.That(t, err, test.ShouldBeNil)
test.That(t, got, test.ShouldEqual, expected)
test.That(t, result, test.ShouldResemble, expected)
test.That(t, result, test.ShouldHaveLength, 3)
test.That(t, msg, test.ShouldContainSubstring, "not found")
```

## Table-Driven Tests

Use table-driven tests for functions with multiple cases:

```go
func TestCalculateTotal(t *testing.T) {
    tests := []struct {
        name     string
        input    []int
        expected int
    }{
        {"empty slice returns zero", []int{}, 0},
        {"sums positive numbers", []int{1, 2, 3}, 6},
    }
    for _, tc := range tests {
        t.Run(tc.name, func(t *testing.T) {
            test.That(t, CalculateTotal(tc.input), test.ShouldEqual, tc.expected)
        })
    }
}
```

## Integration Tests: Real Connect-RPC Servers

Spin up a real h2c server per test — no mocking the transport layer:

```go
func newTestServer(t *testing.T, svc *DrawService) drawv1connect.DrawServiceClient {
    t.Helper()

    mux := http.NewServeMux()
    path, handler := drawv1connect.NewDrawServiceHandler(svc)
    mux.Handle(path, handler)

    srv := httptest.NewUnstartedServer(h2c.NewHandler(mux, &http2.Server{}))
    srv.Start()
    t.Cleanup(srv.Close)

    h2cTransport := &http2.Transport{
        AllowHTTP: true,
        DialTLSContext: func(ctx context.Context, network, addr string, _ *tls.Config) (net.Conn, error) {
            return (&net.Dialer{}).DialContext(ctx, network, addr)
        },
    }

    return drawv1connect.NewDrawServiceClient(
        &http.Client{Transport: h2cTransport},
        srv.URL,
        connect.WithGRPC(),
    )
}
```

## Asserting Connect Errors

```go
var connectErr *connect.Error
test.That(t, errors.As(err, &connectErr), test.ShouldBeTrue)
test.That(t, connectErr.Code(), test.ShouldEqual, connect.CodeNotFound)
```

## Async Assertions — Never `time.Sleep`

Poll with a deadline instead:

```go
func waitFor(t *testing.T, timeout time.Duration, condition func() bool) {
    t.Helper()
    deadline := time.After(timeout)
    for {
        if condition() {
            return
        }
        select {
        case <-deadline:
            t.Fatal("condition not met within timeout")
        case <-time.After(10 * time.Millisecond):
        }
    }
}
```

## Verify Your Work

```
go vet ./...
go test ./draw/... -count=1
go test ./client/... -count=1
golangci-lint run ./draw/... ./client/...
```
