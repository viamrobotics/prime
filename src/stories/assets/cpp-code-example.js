export default `
#include <string>
#include <vector>

#include <boost/optional.hpp>

#include <viam/api/common/v1/common.pb.h>
#include <viam/api/robot/v1/robot.grpc.pb.h>

#include <viam/sdk/robot/client.hpp>


using namespace viam::sdk;

int main() {
  std::string host("modal-main.f5cyhk55u2.viam.cloud");
  DialOptions dial_opts;
  // Replace "<SECRET>" (including brackets) with your robot's secret
  Credentials credentials("<SECRET>");
  dial_opts.set_credentials(credentials);
  boost::optional<DialOptions> opts(dial_opts);
  Options options(0, opts);

  auto robot = RobotClient::at_address(host, options);

  std::cout << "Resources:\n";
  for (const ResourceName& resource: *robot->resource_names()) {
    std::cout << resource.namespace_() << ":" << resource.type() << ":"
              << resource.subtype() << ":" << resource.name() << "\n";
  }
  

  return 0;
}
`;
