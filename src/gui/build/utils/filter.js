var Filter = module.exports;

/**
 * A utility function to get all app JavaScript sources.
 */
Filter.forJS = function(files)
{
    return files.filter(function(file)
    {
        return file.match(/\.js$/);
    });
}

/**
 * A utility function to get all app CSS sources.
 */
Filter.forCSS = function(files)
{
    return files.filter(function(file)
    {
        return file.match(/\.css$/);
    });
}
