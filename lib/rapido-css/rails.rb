module RapidoCss
    module Rails
        if defined? ::Rails and ::Rails.version >= '3.1'
            require 'rapido-css/rails/engine'
        end
    end
end
