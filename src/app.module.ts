import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimsModule } from './claims/claims.module';
import { ConfigModule } from '@nestjs/config';
import { StaffsModule } from './staffs/staffs.module';
import { ProjectsModule } from './projects/projects.module';
import { Staff } from './staffs/entities/staff.entity';
import { Project } from './projects/entities/project.entity';
import { Claim } from './claims/entities/claim.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.DB_URI,
      database: process.env.DB_NAME,
      entities: [Staff, Project, Claim],
      synchronize: true, // Should be FALSE when used in production,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    ClaimsModule,
    StaffsModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
