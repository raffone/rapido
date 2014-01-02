require 'compass'
require 'susy'

extension_path = File.expand_path(File.join(File.dirname(__FILE__), ".."))
Compass::Frameworks.register('rapido-css', :path => extension_path)
