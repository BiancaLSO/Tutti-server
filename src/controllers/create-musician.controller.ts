import { Controller, Post } from "@nestjs/common";


@Controller("create-musician")
export class CreateMusicianController {

  @Post()
  sayHello() {
    return `
    "full-name": "Jane Doe",
    "phone-no": "2122232425",
    "instruments": "",
    "description": "This is a post request",
    "ensembles": "",
    "posts": ""
    `;
  }
}