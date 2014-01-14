Gem::Specification.new do |s|
  # Release Specific Information
  s.version = "0.1.4"
  s.date = "2014-01-07"

  # Gem Details
  s.name = "rapido-css"
  s.authors = ["Raffaele Rasini"]
  s.summary = %q{a quick bootstrap prototyping framework}
  s.description = %q{An easy and quick sass+compass+susy prototyping framework based on Bootstrap without all the default styles.}
  s.email = "raffaele.rasini@gmail.com"
  s.homepage = "https://github.com/raffone/rapido"
  s.license = 'Apache License Version 2.0'

  # Gem Files
  s.files = %w(README.md)
  s.files += Dir.glob("lib/**/*.*")
  s.files += Dir.glob("stylesheets/**/*.*")
  s.files += Dir.glob("templates/**/*.*")

  # Gem Bookkeeping
  s.rubygems_version = %q{1.3.6}
  s.add_dependency "susy", ">= 1.0.8"

end
