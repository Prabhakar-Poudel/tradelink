
class CreateSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :slots do |t|
      t.datetime :starts_at, index: true, null: false
      t.datetime :ends_at, index: true, null: false
      t.timestamps
    end
  end
end
