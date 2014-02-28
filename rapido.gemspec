Gem::Specification.new do |s|
  # Release Specific Information
  s.version = "0.2.1"
  s.date = "2014-02-24"

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
  s.rubygems_version = %q{1.3.6}
  s.add_runtime_dependency 'susy', '~> 1.0', '>= 1.0.8'
  s.add_runtime_dependency 'sass-media_query_combiner', '~> 0.0', '>= 0.0.6'
  s.add_runtime_dependency 'sass-globbing', '~> 1.1', '>= 1.1.0'

end
