package main

import (
	"os"

	"embed"

	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS


func main() {
	app := NewApp()
  
	go  func() {
		pocketBaseApp  :=  pocketbase.New()
		isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())
		migratecmd.MustRegister(pocketBaseApp, pocketBaseApp.RootCmd, migratecmd.Config{
			// enable auto creation of migration files when making collection changes in the Admin UI
			// (the isGoRun check is to enable it only during development)
			Automigrate: isGoRun,
		})
		pocketBaseApp.Bootstrap()
		pocketBaseApp.OnBeforeServe().Add(addCategoryCollection(pocketBaseApp))
		pocketBaseApp.OnBeforeServe().Add(addTransactionMethodCollection(pocketBaseApp))
		pocketBaseApp.OnBeforeServe().Add(addIncomeCollection(pocketBaseApp))
		pocketBaseApp.OnBeforeServe().Add(addExpenseCollection(pocketBaseApp))
		pocketBaseApp.OnBeforeServe().Add(addEventsCollection(pocketBaseApp))
		pocketBaseApp.OnBeforeServe().Add(addContactsCollection(pocketBaseApp))
		pocketBaseApp.OnBeforeServe().Add(addPostsCollection(pocketBaseApp))
		apis.Serve(pocketBaseApp, apis.ServeConfig{
			HttpAddr: "127.0.0.1:8080",
			ShowStartBanner: false,
		})
		

	}()
  
	err := wails.Run(&options.App{
	  Title:       "Expense Tracker",
	  Width:       1024,
	  Height:      768,
	  StartHidden: false,
	  AssetServer: &assetserver.Options{
		Assets: assets,
	  },
	  BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
	  Menu:              nil,
	Logger:            nil,
	LogLevel:          logger.DEBUG,
	OnStartup:         app.startup,
	OnDomReady:        app.domReady,
	OnBeforeClose:     app.beforeClose,
	OnShutdown:        app.shutdown,
	WindowStartState:  options.Normal,
	Bind: []interface{}{
		app,
	},
	})
  
	if err != nil {
	  println("Error:", err.Error())
	}
  }

  