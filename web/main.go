package main

import (
  "github.com/go-martini/martini"
)

func main() {
  m := martini.New()

  m.Use(martini.Recovery())
  m.Use(martini.Logger())
  m.Use(render.Renderer())

  r := martini.NewRouter()

  m.Get("/", func() string {
    return "Hello CS 6440 Team!"
  })

  m.Run();
}
