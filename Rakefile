# encoding: utf-8

require 'rubygems'
require 'compass'

require 'bundler'
begin
  Bundler.setup(:default, :development)
rescue Bundler::BundlerError => e
  $stderr.puts e.message
  $stderr.puts "Run `bundle install` to install missing gems"
  exit e.status_code
end
require 'rake'

require 'jeweler'
Jeweler::Tasks.new do |gem|
  # gem is a Gem::Specification... see http://docs.rubygems.org/read/chapter/20 for more options
  gem.name = "rapido-css"
  gem.homepage = "http://github.com/raffone/rapido-css"
  gem.license = "MIT"
  gem.summary = "Simple prototyping framework built on top of Bootstrap"
  gem.description = "An early alpha gem for the framework"
  gem.email = "raffaele.rasini@gmail.com"
  gem.authors = ["Raffaele Rasini"]
  # dependencies defined in Gemfile
end
Jeweler::RubygemsDotOrgTasks.new