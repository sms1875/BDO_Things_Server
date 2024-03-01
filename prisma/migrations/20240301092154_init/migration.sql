BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Item] (
    [id] INT NOT NULL,
    [sub_id] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [icon_image] NVARCHAR(1000) NOT NULL,
    [grade_type] INT NOT NULL,
    [weight] FLOAT(53) NOT NULL,
    [buy_price] INT NOT NULL,
    [sell_price] INT NOT NULL,
    [repair_price] INT NOT NULL,
    [has_market_data] BIT NOT NULL,
    [expiration_period] INT NOT NULL,
    [tooltip] NVARCHAR(1000),
    CONSTRAINT [Item_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Item_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Design] (
    [id] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [icon_image] NVARCHAR(1000) NOT NULL,
    [crafting_time] INT NOT NULL,
    [db_type] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Design_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Design_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_ingredients] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_ingredients_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateTable
CREATE TABLE [dbo].[_products] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_products_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_ingredients_B_index] ON [dbo].[_ingredients]([B]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_products_B_index] ON [dbo].[_products]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[_ingredients] ADD CONSTRAINT [_ingredients_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Design]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_ingredients] ADD CONSTRAINT [_ingredients_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Item]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_products] ADD CONSTRAINT [_products_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Design]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_products] ADD CONSTRAINT [_products_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Item]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
