package main

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
	"github.com/pocketbase/pocketbase/tools/types"
)
func addCategoryCollection(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
        _, err := app.Dao().FindCollectionByNameOrId("category")
        if err != nil {
            userRequiredRule := ""

            collection := &models.Collection{
                Name:       "category",
                System:     true,
                CreateRule: &userRequiredRule,
                ListRule:   &userRequiredRule,
                ViewRule:   &userRequiredRule,
                UpdateRule: &userRequiredRule,
                DeleteRule: &userRequiredRule,
                Schema: schema.NewSchema(
                    &schema.SchemaField{
                        Name:     "name",
                        Type:     schema.FieldTypeText,
                        Unique:   true,
                        Required: true,
                        System:   false, 
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "details",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    
                ),
            }
            collection.SetId("category_id")
            err := app.Dao().SaveCollection(collection)
            if err != nil {
                println("Error:", err.Error())
              }
        } else {
            println("Collection Creation successfully")
        }
		return nil
	}
}
func addTransactionMethodCollection(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
        _, err := app.Dao().FindCollectionByNameOrId("transaction_method")
        if err != nil {
            userRequiredRule := ""

            collection := &models.Collection{
                Name:       "transaction_method",
                System:     true,
                CreateRule: &userRequiredRule,
                ListRule:   &userRequiredRule,
                ViewRule:   &userRequiredRule,
                UpdateRule: &userRequiredRule,
                DeleteRule: &userRequiredRule, 
                Schema: schema.NewSchema(
                    &schema.SchemaField{
                        Name:     "name",
                        Type:     schema.FieldTypeText,
                        Unique:   true,
                        Required: true,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "details",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                   
                ),
            }
            collection.SetId("transaction_method_id")
            err := app.Dao().SaveCollection(collection)
            if err != nil {
                println("Error:", err.Error())
              }
        } else {
            println("Collection Creation successfully")
        }
		return nil
	}
}
func addEventsCollection(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
        _, err := app.Dao().FindCollectionByNameOrId("events")
        if err != nil {
            userRequiredRule := ""

            collection := &models.Collection{
                Name:       "events",
                System:     true,
                CreateRule: &userRequiredRule,
                ListRule:   &userRequiredRule,
                ViewRule:   &userRequiredRule,
                UpdateRule: &userRequiredRule,
                DeleteRule: &userRequiredRule, 
                Schema: schema.NewSchema(
                    &schema.SchemaField{
                        Name:     "event_name",
                        Type:     schema.FieldTypeText,
                        Unique:   true,
                        Required: true,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "event_start_date",
                        Type:     schema.FieldTypeDate,
                        Unique:   false,
                        Required: true,
                        System:   false,
                        Options:  &schema.DateOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "event_end_date",
                        Type:     schema.FieldTypeDate,
                        Unique:   false,
                        Required: true,
                        System:   false,
                        Options:  &schema.DateOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "details",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                ),
            }
            collection.SetId("events_id")
            err := app.Dao().SaveCollection(collection)
            if err != nil {
                println("Error:", err.Error())
              }
        } else {
            println("Collection Creation successfully")
        }
		return nil
	}
}
func addIncomeCollection(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
        _, err := app.Dao().FindCollectionByNameOrId("income")
        if err != nil {
            userRequiredRule := ""

            collection := &models.Collection{
                Name:       "income",
                System:     true,
                CreateRule: &userRequiredRule,
                ListRule:   &userRequiredRule,
                ViewRule:   &userRequiredRule,
                UpdateRule: &userRequiredRule,
                DeleteRule: &userRequiredRule, 
                Schema: schema.NewSchema(
                    &schema.SchemaField{
                        Name:     "type",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "title",
                        Type:     schema.FieldTypeText,
                        Unique:   true,
                        Required: true,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "details",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "amount",
                        Type:     schema.FieldTypeNumber,
                        Unique:   false,
                        Required: true,
                        System:   false,
                        Options:  &schema.NumberOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "transaction_date",
                        Type:     schema.FieldTypeDate,
                        Unique:   false,
                        Required: true,
                        System:   false,
                        Options:  &schema.DateOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "category",
                        Type:     schema.FieldTypeRelation,
                        Required: true,
                        Options:  &schema.RelationOptions{
                            MaxSelect:     types.Pointer(1),
                            CollectionId:  "category_id",
                            CascadeDelete: true,
                        },
                    },
                    &schema.SchemaField{
                        Name:     "transaction_method",
                        Type:     schema.FieldTypeRelation,
                        Required: true,
                        Options:  &schema.RelationOptions{
                            MaxSelect:     types.Pointer(1),
                            CollectionId:  "transaction_method_id",
                            CascadeDelete: true,
                        },
                    },
                    &schema.SchemaField{
                        Name:     "events",
                        Type:     schema.FieldTypeRelation,
                        Required: false,
                        Options:  &schema.RelationOptions{
                            MaxSelect:     types.Pointer(1),
                            CollectionId:  "events_id",
                            CascadeDelete: true,
                        },
                    },
                ),
            }
            err := app.Dao().SaveCollection(collection)
            if err != nil {
                println("Error:", err.Error())
              }
        } else {
            println("Collection Creation successfully")
        }
		return nil
	}
}
func addExpenseCollection(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
        _, err := app.Dao().FindCollectionByNameOrId("expense")
        if err != nil {
            userRequiredRule := ""

            collection := &models.Collection{
                Name:       "expense",
                System:     true,
                CreateRule: &userRequiredRule,
                ListRule:   &userRequiredRule,
                ViewRule:   &userRequiredRule,
                UpdateRule: &userRequiredRule,
                DeleteRule: &userRequiredRule, 
                Schema: schema.NewSchema(
                    &schema.SchemaField{
                        Name:     "type",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "title",
                        Type:     schema.FieldTypeText,
                        Unique:   true,
                        Required: true,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "details",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "amount",
                        Type:     schema.FieldTypeNumber,
                        Unique:   false,
                        Required: true,
                        System:   false,
                        Options:  &schema.NumberOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "transaction_date",
                        Type:     schema.FieldTypeDate,
                        Unique:   false,
                        Required: true,
                        System:   false,
                        Options:  &schema.DateOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "category",
                        Type:     schema.FieldTypeRelation,
                        Required: true,
                        Options:  &schema.RelationOptions{
                            MaxSelect:     types.Pointer(1),
                            CollectionId:  "category_id",
                            CascadeDelete: true,
                        },
                    },
                    &schema.SchemaField{
                        Name:     "transaction_method",
                        Type:     schema.FieldTypeRelation,
                        Required: true,
                        Options:  &schema.RelationOptions{
                            MaxSelect:     types.Pointer(1),
                            CollectionId:  "transaction_method_id",
                            CascadeDelete: true,
                        },
                    },
                    &schema.SchemaField{
                        Name:     "events",
                        Type:     schema.FieldTypeRelation,
                        Required: false,
                        Options:  &schema.RelationOptions{
                            MaxSelect:     types.Pointer(1),
                            CollectionId:  "events_id",
                            CascadeDelete: true,
                        },
                    },
                ),
            }
            err := app.Dao().SaveCollection(collection)
            if err != nil {
                println("Error:", err.Error())
              }
        } else {
            println("Collection Creation successfully")
        }
		return nil
	}
}
func addContactsCollection(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
        _, err := app.Dao().FindCollectionByNameOrId("contacts")
        if err != nil {
            userRequiredRule := ""

            collection := &models.Collection{
                Name:       "contacts",
                System:     true,
                CreateRule: &userRequiredRule,
                ListRule:   &userRequiredRule,
                ViewRule:   &userRequiredRule,
                UpdateRule: &userRequiredRule,
                DeleteRule: &userRequiredRule, 
                Schema: schema.NewSchema(
                    &schema.SchemaField{
                        Name:     "name",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: true,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "company",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "details",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "position",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "blood_group",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "address",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "contact_number",
                        Type:     schema.FieldTypeNumber,
                        Unique:   false,
                        Required: true,
                        System:   false,
                        Options:  &schema.NumberOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "email",
                        Type:     schema.FieldTypeText,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "avatar",
                        Type:     schema.FieldTypeFile,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.FileOptions{
                            MaxSize: 5242880,
                            MaxSelect:99,
                            
                        },
                    },
                    
                   
                ),
            }
            collection.SetId("contacts_id")
            err := app.Dao().SaveCollection(collection)
            if err != nil {
                println("Error:", err.Error())
              }
        } else {
            println("Collection Creation successfully")
        }
		return nil
	}
}

func addPostsCollection(app *pocketbase.PocketBase) func(e *core.ServeEvent) error {
	return func(e *core.ServeEvent) error {
        _, err := app.Dao().FindCollectionByNameOrId("posts")
        if err != nil {
            userRequiredRule := ""

            collection := &models.Collection{
                Name:       "posts",
                System:     true,
                CreateRule: &userRequiredRule,
                ListRule:   &userRequiredRule,
                ViewRule:   &userRequiredRule,
                UpdateRule: &userRequiredRule,
                DeleteRule: &userRequiredRule, 
                Schema: schema.NewSchema(
                    &schema.SchemaField{
                        Name:     "title",
                        Type:     schema.FieldTypeText,
                        Unique:   true,
                        Required: true,
                        System:   false,
                        Options:  &schema.TextOptions{},
                    },
                    &schema.SchemaField{
                        Name:     "content",
                        Type:     schema.FieldTypeJson,
                        Unique:   false,
                        Required: false,
                        System:   false,
                        Options:  &schema.JsonOptions{
                            MaxSize: 2000000,
                        },
                    },
                   
                ),
            }
            collection.SetId("posts_id")
            err := app.Dao().SaveCollection(collection)
            if err != nil {
                println("Error:", err.Error())
              }
        } else {
            println("Collection Creation successfully")
        }
		return nil
	}
}