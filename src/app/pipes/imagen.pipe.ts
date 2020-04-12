import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: "imagen",
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = "usuarios"): any {
    let url = URL_SERVICIOS + "/imagenes/";
    if (!img) {
      return url + "/usuarios/404";
    }

    if (img.indexOf("https") >= 0) {
      return img;
    }

    switch (tipo) {
      case "usuarios":
        return (url += "/usuarios/" + img);

        break;

      case "medicos":
        return (url += "/medicos/" + img);
        break;

      case "hospitales":
        return (url += "/hospitales/" + img);

        break;

      default:
        return url + "/usuarios/404";
    }
    return url;
  }
}
