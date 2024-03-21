import type { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { Opaque } from '@poppinss/utils/types'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import {
  BaseModel,
  beforeCreate,
  column,
  computed,
  manyToMany,
  belongsTo,
} from '@adonisjs/lucid/orm'

import ItemList from '#models/item_list'
import ItemBase from '#models/item_base'
import ItemRarity from '#models/item_rarity'
import ItemProperty from '#models/item_property'
import type { ItemBaseId } from '#models/item_base'
import type { ItemRarityId } from '#models/item_rarity'

export type ItemId = Opaque<'itemId', string>

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  declare id: ItemId

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare level: number

  @column()
  declare isActive: boolean

  @column()
  declare isTradeable: boolean

  @column()
  declare itemBaseId: ItemBaseId

  @column()
  declare itemRarityId: ItemRarityId

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @beforeCreate()
  static async generateId(item: Item) {
    item.id = randomUUID() as ItemId
  }

  @belongsTo(() => ItemBase)
  declare itemBase: BelongsTo<typeof ItemBase>

  @belongsTo(() => ItemRarity)
  declare itemRarity: BelongsTo<typeof ItemRarity>

  @manyToMany(() => ItemList, {
    pivotTable: 'item_item_lists',
    pivotColumns: ['drop_chance', 'only_boss'],
  })
  declare itemLists: ManyToMany<typeof ItemList>

  @computed()
  get dropChance(): number | null {
    return this.$extras.pivot_drop_chance
  }

  @computed()
  get onlyBoss(): boolean {
    return this.$extras.pivot_only_boss
  }

  @computed()
  get properties(): object {
    return ItemProperty.findBy('entityId', this.id)
  }
}
