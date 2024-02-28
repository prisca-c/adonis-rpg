import type { DateTime } from 'luxon'
import type { Opaque } from '@poppinss/utils/types'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type EnemyTypeId = Opaque<'enemyTypeId', string>

export default class EnemyType extends BaseModel {
  @column({ isPrimary: true })
  declare id: EnemyTypeId

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
