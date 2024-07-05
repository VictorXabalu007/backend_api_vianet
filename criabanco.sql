CREATE TABLE banco_farma.`Admin`(
`Usuario_id` INT(11) NOT NULL, username VARCHAR(50) NOT NULL,
  PRIMARY KEY(`Usuario_id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

CREATE TABLE banco_farma.`Distribuidores`(
  username VARCHAR(50) NOT NULL,
  endereco VARCHAR(100) NOT NULL,
  usuario_id INT(11) NOT NULL,
  PRIMARY KEY(usuario_id)
) ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `Distribuidoras_usuario_FK` USING BTREE ON
    banco_farma.`Distribuidores`(usuario_id);

CREATE TABLE banco_farma.`Farmacia`(
  username CHAR(50) NOT NULL,
  usuario_id INT(11) NOT NULL,
  pontos DECIMAL(50,1) NOT NULL,
  celular BIGINT(20) NOT NULL,
  `Nome` VARCHAR(20) NOT NULL,
  `CNPJ` VARCHAR(14) NOT NULL,
  endereco VARCHAR(100) NOT NULL,
  PRIMARY KEY(usuario_id)
) ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `Cliente_usuario_FK` USING BTREE ON banco_farma.`Farmacia`
    (usuario_id);

CREATE TABLE banco_farma.`Historico`(
  `data` DATETIME NOT NULL,
  `Historico_ID` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `Cliente_usuario_id` INT(11) NOT NULL,
  `Distribuidores_usuario_id` INT(11) NOT NULL,
  PRIMARY KEY(`Historico_ID`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `Historico_Cliente_FK` USING BTREE ON banco_farma.`Historico`
    (`Cliente_usuario_id`);

  CREATE INDEX `Historico_Distribuidoras_FK` USING BTREE ON
    banco_farma.`Historico`(`Distribuidores_usuario_id`);

CREATE TABLE banco_farma.`Patrocinado`
  (`Produtos_id_produto` INT(11) NOT NULL, PRIMARY KEY(`Produtos_id_produto`))
  ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

CREATE TABLE banco_farma.`Pedido`(
  `status` VARCHAR(50) NOT NULL,
  `Historico_Historico_ID` BIGINT(20) NOT NULL,
  quantidade INT(11) NOT NULL,
  `Produtos_id_produto` INT(11) NOT NULL,
  PRIMARY KEY(`Historico_Historico_ID`, `Produtos_id_produto`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `pedido_Historico_FK` USING BTREE ON banco_farma.`Pedido`
    (`Historico_Historico_ID`);

  CREATE INDEX `id_produto_Pedido` USING BTREE ON banco_farma.`Pedido`
    (`Produtos_id_produto`);

CREATE TABLE banco_farma.`Produtos`(
  id_produto INT(11) NOT NULL AUTO_INCREMENT,
  nome_produto VARCHAR(50) NOT NULL,
  foto LONGBLOB NOT NULL,
  preco DECIMAL(6,2) NOT NULL,
  num_vendas DECIMAL(10,0) NOT NULL,
  descricao VARCHAR(1000) NOT NULL,
  `Distribuidores_usuario_id` INT(11) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  industria VARCHAR(100) NOT NULL,
  minimo INT(11) NOT NULL,
  `EAN` BIGINT(13) NOT NULL,
  codigo VARCHAR(255) NOT NULL,
  PRIMARY KEY(id_produto)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

  CREATE INDEX `Produtos_Distribuidoras_FK` USING BTREE ON banco_farma.`Produtos`
    (`Distribuidores_usuario_id`);

CREATE TABLE banco_farma.`Promocao`(
  `Produtos_id_produto` INT(11) NOT NULL,
  novo_preco DECIMAL(6,2),
  data_fim DATE NOT NULL,
  PRIMARY KEY(`Produtos_id_produto`, data_fim)
) ENGINE = InnoDB DEFAULT CHARACTER SET = `utf8mb4`
  COLLATE = `utf8mb4_general_ci`;

CREATE TABLE banco_farma.`Usuario`(
  id INT(11) NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(50) NOT NULL,
  tipo INT(11) NOT NULL,
  `imgPerfil` VARCHAR(255) NOT NULL DEFAULT '../uploads/default.png',
  PRIMARY KEY(id)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARACTER SET = `utf8mb4` COLLATE = `utf8mb4_general_ci`;

ALTER TABLE banco_farma.`Farmacia`
  ADD CONSTRAINT `Cliente_usuario_FK`
    FOREIGN KEY (usuario_id) REFERENCES banco_farma.`Usuario` (id)
      ON DELETE No action ON UPDATE No action;

ALTER TABLE banco_farma.`Distribuidores`
  ADD CONSTRAINT `Distribuidoras_usuario_FK`
    FOREIGN KEY (usuario_id) REFERENCES banco_farma.`Usuario` (id)
      ON DELETE No action ON UPDATE No action;

ALTER TABLE banco_farma.`Historico`
  ADD CONSTRAINT `Historico_Cliente_FK`
    FOREIGN KEY (`Cliente_usuario_id`)
      REFERENCES banco_farma.`Farmacia` (usuario_id) ON DELETE No action
      ON UPDATE No action;

ALTER TABLE banco_farma.`Historico`
  ADD CONSTRAINT `Historico_Distribuidoras_FK`
    FOREIGN KEY (`Distribuidores_usuario_id`)
      REFERENCES banco_farma.`Distribuidores` (usuario_id) ON DELETE No action
      ON UPDATE No action;

ALTER TABLE banco_farma.`Produtos`
  ADD CONSTRAINT `Produtos_Distribuidoras_FK`
    FOREIGN KEY (`Distribuidores_usuario_id`)
      REFERENCES banco_farma.`Distribuidores` (usuario_id) ON DELETE No action
      ON UPDATE No action;

ALTER TABLE banco_farma.`Promocao`
  ADD CONSTRAINT `Produtos_table1`
    FOREIGN KEY (`Produtos_id_produto`)
      REFERENCES banco_farma.`Produtos` (id_produto) ON DELETE No action
      ON UPDATE No action;

ALTER TABLE banco_farma.`Patrocinado`
  ADD CONSTRAINT `Produtos_table2`
    FOREIGN KEY (`Produtos_id_produto`)
      REFERENCES banco_farma.`Produtos` (id_produto) ON DELETE No action
      ON UPDATE No action;

ALTER TABLE banco_farma.`Admin`
  ADD CONSTRAINT `id_Admin`
    FOREIGN KEY (`Usuario_id`) REFERENCES banco_farma.`Usuario` (id)
      ON DELETE No action ON UPDATE No action;

ALTER TABLE banco_farma.`Pedido`
  ADD CONSTRAINT `id_produto_Pedido`
    FOREIGN KEY (`Produtos_id_produto`)
      REFERENCES banco_farma.`Produtos` (id_produto) ON DELETE No action
      ON UPDATE No action;

ALTER TABLE banco_farma.`Pedido`
  ADD CONSTRAINT `pedido_Historico_FK`
    FOREIGN KEY (`Historico_Historico_ID`)
      REFERENCES banco_farma.`Historico` (`Historico_ID`) ON DELETE No action
      ON UPDATE No action;
