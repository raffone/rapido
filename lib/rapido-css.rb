# require 'compass'
# Compass::Frameworks.register("rapido", :path => "#{File.dirname(__FILE__)}/..")


require 'compass'
require "rapido-css/rails"
require "rapido-css/version"

plugin_root = File.join(File.dirname(__FILE__), "..")

Compass::Frameworks.register("rapido-css", :stylesheets_directory => File.join(plugin_root, "stylesheets")

