import { NestFactory, PartialGraphHost } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  app.setGlobalPrefix("api");
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Job Application Tracker API")
    .setDescription("Job Application Tracker API")
    .setVersion("1.0")
    .addTag("jobs")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}
bootstrap().catch(() => {
  fs.writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
  process.exit(1);
});
