import {Config} from "@remotion/cli/config";
import {enableTailwind} from "@remotion/tailwind";

Config.setVideoImageFormat("png");
Config.setPixelFormat("yuv420p");
Config.setCodec("h264");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig((config) => enableTailwind(config));
