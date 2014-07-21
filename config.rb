# Require any additional compass plugins here.
on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end

# Ensure maximum useful precision
Sass::Script::Number.precision = 7
module Sass::Script::Functions
  def precision(*args)
    if !args[0].nil?
      precision = args[0]
      assert_type precision, :Number
      Sass::Script::Number.precision = precision.value
    end
    Sass::Script::Number.new(Sass::Script::Number.precision)
  end

  declare :precision, :args => [:number]
end
# Set this to the root of your project when deployed:
relative_assets = true
http_path = "/"
sass_dir = "sass"
css_dir = "/"
images_dir = "images"
fonts_dir ="fonts"
line_comments = false
asset_cache_buster :none
output_style = :compact

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass


