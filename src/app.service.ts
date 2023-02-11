import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
const { readFileSync } = require('fs');
import * as QRCode from 'qrcode';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService, private configService: ConfigService) { }

  async getQRCode(): Promise<any> {
    const movieList = await this.getMovies();
    if (!movieList) throw new ForbiddenException(`An error occured!`)
    const url = QRCode.toDataURL(this.configService.get<string>('BASE_URL') + movieList.id)
    return url;
  }

  //Function to get 10 random movies from JSON file & save to database
  async getMovies() {
    let movies = [];
    const data = await readFileSync('src/Film.JSON')
    const film = JSON.parse(data);
    let index = [];
    while (index.length < 10) {
      let r = Math.floor(Math.random() * 16);
      // To makes sure the 10 movies are unique
      if (index.indexOf(r) === -1) {
        index.push(r);
        const films = {
          "Title": film[r].Title,
          "Images": film[r].Images,
        };
        movies.push(films);
      }
    }
    //Save the movies to the database
    const movieList = await this.prisma.movieList.create({
      data: {
        movies
      }
    });

    return movieList;
  }
}
