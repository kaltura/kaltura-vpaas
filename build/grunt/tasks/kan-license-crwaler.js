var bowerLicense = require('bower-license'),
    _ = require('lodash'),
    nlf = require('nlf'),
    util = require('util');

module.exports = function (grunt) {

    'use strict';

    grunt.registerMultiTask('kan-license-crwaler', 'Gather bower license report', function () {
        var options = this.options({
                directory: 'bower_components',
                output: ''
            }),
            done = this.async();


        if (options.output) {
            var items = [];

            console.log('discovering bower dependencies licenses');
            bowerLicense.init({directory: options.bowerDirectory}, function (data) {
                for (var entry in data) {
                    var item = {
                        licenses: [],
                        repository: "",
                        homepage: ""
                    };

                    for (var prop in data[entry]) {
                        if (prop === 'licenses') {
                            item.licenses.push(data[entry][prop]);
                        } else if (prop === 'repository') {
                            item.repository = data[entry][prop];
                            if (item.repository.constructor === Object) {
                                item.repository = item.repository.url;
                            }
                        } else if (prop === 'homepage') {
                            item.homepage = data[entry][prop];
                        }
                    }

                    item.version = entry.substring(entry.indexOf('@') + 1, entry.length);
                    item.name = entry.substring(0, entry.indexOf('@'));

                    items.push(item);
                }

                console.log('discovering node dependencies licenses');
                nlf.find({depth: 0}, function (err, data) {
                    _.each(data, function (entry) {
                        var item = {
                            name: entry.name,
                            version: entry.version,
                            repository: entry.repository,
                            licenses: [],
                            homepage: ""
                        };

                        if (entry.licenseSources) {
                            if (entry.licenseSources.package && entry.licenseSources.package.sources) {
                                _.each(entry.licenseSources.package.sources, function (source) {
                                    item.licenses.push(source.license + ' (package file)');
                                });
                            }
                            if (entry.licenseSources.license && entry.licenseSources.license.sources) {
                                _.each(entry.licenseSources.license.sources, function (source) {
                                    var license = nlf.licenseFind(source.text);
                                    if (license !== 'undefined') {
                                        item.licenses.push(license  + ' (license file)');
                                    }
                                });
                            }
                            if (entry.licenseSources.readme && entry.licenseSources.readme.sources) {
                                _.each(entry.licenseSources.readme.readme, function (source) {
                                    var license = nlf.licenseFind(source.text);

                                    if (license !== 'undefined') {
                                        item.licenses.push(license + ' (readme file)');
                                    }

                                });

                            }

                        }
                        items.push(item);
                    });

                    console.log('found %s dependencies', items.length);

                    var fileContent = "";
                    fileContent += "# Open Source & 3rd-party components in this project\n\n";
                    fileContent += util.format('| Name | Version| Licenses | Repository |\n');
                    fileContent += util.format('| ---- |------- | -------- | ---------- |\n');

                    if (options.addLibraries) {
                        items = _.flatten([items, options.addLibraries]);
                    }

                    if (options.removeLibraries) {
                        _.remove(items,function(item)
                        {
                            return _.find(options.removeLibraries,function(license)
                            {
                                return license === item.name;
                            });
                        });
                    }

                    _.chain(items).sortBy('name').each(function (item) {
                        var formattedVersion = item.version && item.version !== 'undefined' ? item.version : '{unknown version}';
                        var formattedLicenses = '';
                        var uniqueLicenseList = _.chain(item.licenses).flattenDeep().uniq().value();
                        if (uniqueLicenseList.length)
                        {
                            formattedLicenses = _.join(uniqueLicenseList,', ');
                        }else
                        {
                            formattedLicenses = '{unknown license}';
                        }


                        fileContent += util.format('| %s | %s | %s | %s |\n', item.name, formattedVersion, formattedLicenses, item.repository);
                    }).value();


                    // If output file already exists, will delete it
                    if (grunt.file.exists(options.output)) {
                        console.log('Output file already exists. Will delete it');
                        grunt.file.delete(options.output);
                    }

                    grunt.file.write(options.output, fileContent);

                    done();
                });
            });
        } else {
            done(new Error('missing output path'));
        }
    });
};
