# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170528134015) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_type"
    t.integer  "resource_id"
    t.string   "author_type"
    t.integer  "author_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree
  end

  create_table "bins", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.integer  "disposal_type"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer  "total_time"
    t.integer  "version_id"
    t.integer  "total_points"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["version_id"], name: "index_games_on_version_id", using: :btree
  end

  create_table "items", force: :cascade do |t|
    t.string   "image_url"
    t.string   "name"
    t.string   "description"
    t.string   "incorrect_message"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "bin_id"
    t.integer  "level_id"
    t.index ["bin_id"], name: "index_items_on_bin_id", using: :btree
    t.index ["level_id"], name: "index_items_on_level_id", using: :btree
  end

  create_table "levels", force: :cascade do |t|
    t.integer  "difficulty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "version_id"
    t.index ["version_id"], name: "index_levels_on_version_id", using: :btree
  end

  create_table "players", force: :cascade do |t|
    t.string   "email"
    t.integer  "score"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "game_id"
    t.index ["game_id"], name: "index_players_on_game_id", using: :btree
  end

  create_table "responses", force: :cascade do |t|
    t.integer  "item_id"
    t.integer  "game_id"
    t.integer  "bin_id"
    t.boolean  "correct"
    t.integer  "time_taken"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "attempt"
    t.index ["bin_id"], name: "index_responses_on_bin_id", using: :btree
    t.index ["game_id"], name: "index_responses_on_game_id", using: :btree
    t.index ["item_id"], name: "index_responses_on_item_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "versions", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "games", "versions"
  add_foreign_key "items", "bins"
  add_foreign_key "items", "levels"
  add_foreign_key "levels", "versions"
  add_foreign_key "players", "games"
  add_foreign_key "responses", "bins"
  add_foreign_key "responses", "games"
  add_foreign_key "responses", "items"
end
