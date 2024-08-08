import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: "sqlite",
        database: ":memory:",
        entities: [__dirname + "./../src/**/entities/*.entity.ts"],
        synchronize: true,
      dropSchema: true
    }),
    AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

  });
  afterAll(async () => {
    await app.close();
  });

  it("01 - Deve Cadatrar um novo Usuário ", async () => {
    const resposta = await request(app.getHttpServer()).post('/usuarios/cadastrar').send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      data_nascimento: '23/11/2000',
      cpf: '444444444444444',
      foto: '-',
    })
    .expect(201);

    usuarioId = resposta.body.id;
  })

  it("02 - Não Deve Cadatrar um novo Usuário Duplicado", async () => {
    const resposta = await request(app.getHttpServer()).post('/usuarios/cadastrar').send({
      nome: 'Root',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: '-'
    })
    .expect(400);
  })
 
  it("03 - Deve Autenticar um Usuário (Login) ", async () => {
    const resposta = await request(app.getHttpServer()).post('/usuarios/logar').send({
      usuario: 'root@root.com',
      senha: 'rootroot'
    })
    .expect(200);

    token = resposta.body.token;
  })

  it("04 - Deve Listar todos os Usuário", async () => {
    const resposta = await request(app.getHttpServer()).get('/usuarios/all').set('Authorization', `${token}`)
    .expect(200);

  })

  
  it("05 - Atualizar Usuário ", async () => {
    const resposta = await request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'adm do sistema',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: 'foto.jpg'
    })
    .expect(200)
    .then( resposta => {
      expect("adm do sistema").toEqual(resposta.body.nome);
    });
  })

  it("06 - Deve Listar Usuário pelo ID", async () => {
    const resposta = await request(app.getHttpServer()).get(`/usuarios/${usuarioId}`).set('Authorization', `${token}`)
    .expect(200);

  })


});
