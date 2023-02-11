import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get(':id')
    async getMovies(@Param('id') id: string) {
        return await this.moviesService.getMovies(id)
    }
}
