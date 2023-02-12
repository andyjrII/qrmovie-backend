import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class MoviesService {
    constructor(private prisma: PrismaService) { }

    async getMovies(id: string): Promise<any> {
        const movieList = await this.prisma.movielist.findUnique({
            where: { id }
        });
        if (!movieList) throw new ForbiddenException(`Invalid URL`);
        return movieList.movies;
    }

}
