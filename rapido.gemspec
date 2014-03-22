Gem::Specification.new do |s|
  # Release Specific Information
  s.version = "0.2.4"
  s.date = "2014-03-22"

  # Gem Details
  s.name = "rapido-css"
  s.authors = ["Raffaele Rasini"]
  s.summary = %q{A quick css prototyping framework}
  s.description = %q{An easy and quick Sass + Compass + Susy + OOCSS + BEM prototyping framework.}
  s.email = "raffaele.rasini@gmail.com"
  s.homepage = "https://github.com/raffone/rapido"
  s.license = 'MIT'

  # Gem Files
  s.files = %w(README.md)
  s.files += Dir.glob("lib/**/*.*")
  s.files += Dir.glob("stylesheets/**/*.*")
  s.files += Dir.glob("templates/**/*.*")

  # Gem Bookkeeping
  s.add_dependency("sass",                      [">=3.3"])
  s.add_dependency("compass",                   [">=1.0.0.alpha.18"])
  s.add_dependency("susy",                      [">=2.0"])
  s.add_dependency("sass-media_query_combiner", [">=0.0"])
  s.add_dependency("sass-globbing",             [">=1.1"])
  s.add_dependency("breakpoint",                [">=2.4"])
  s.add_dependency("compass-placeholders",      [">=1.1"])
  s.add_dependency("oily_png",                  [">=1.1"])

end
