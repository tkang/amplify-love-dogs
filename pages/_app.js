import "../styles/globals.css";
import Amplify from "aws-amplify";
import config from "../src/aws-exports";
import { Analytics, AWSKinesisProvider } from "aws-amplify";

Amplify.configure(config);
Analytics.addPluggable(new AWSKinesisProvider());
Analytics.configure({
  AWSKinesis: {
    region: config.aws_project_region,
  },
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
