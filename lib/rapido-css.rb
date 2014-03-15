require 'compass'
require 'breakpoint'
require 'susy'
require 'sass-media_query_combiner'
require 'sass-globbing'
require 'compass-placeholders'

extension_path = File.expand_path(File.join(File.dirname(__FILE__), ".."))
Compass::Frameworks.register('rapido-css', :path => extension_path)
