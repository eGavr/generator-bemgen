var fs = require('fs'),
    bemtools = require('../app/lib/bem-tools'),
    enb = require('../app/lib/enb'),
    config = JSON.parse(fs.readFileSync('test/test.config.json', 'utf-8'));

// bem-tools
// --------------------------------------

describe('\'bem-tools\'', function () {
    it('must get all platforms without design', function () {
        var pls = [
                ['common', 'desktop'],
                ['common', 'touch', 'touch-pad'],
                ['common', 'touch', 'touch-phone']
            ],
            libs = [
                { name: 'bem-core', version: '' },
                { name: 'bem-components', version: '' }
            ],
            output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getPlatforms.no.design.json', 'utf-8'));

        bemtools.getPlatforms(pls, libs, false).must.eql(output);
    });

    it('must get all platforms with design', function () {
        var pls = [
                ['common', 'desktop'],
                ['common', 'touch', 'touch-pad'],
                ['common', 'touch', 'touch-phone']
            ],
            libs = [
                { name: 'bem-core', version: '' },
                { name: 'bem-components', version: '' }
            ],
            output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getPlatforms.design.json', 'utf-8'));

        bemtools.getPlatforms(pls, libs, true).must.eql(output);
    });

    it('must add preprocessor', function () {
        bemtools.addPreprocessor([], 'stylus').must.eql(['stylus', 'css']);
    });

    it('must add preprocessor after technology \'bemjson.js\'', function () {
        bemtools.addPreprocessor(['bemjson.js'], 'stylus', false).must.eql(['bemjson.js', 'stylus', 'css']);
    });

    it('must add \'css\'', function () {
        bemtools.addPreprocessor([], 'css').must.eql(['css']);
    });

    it('must add \'css\' after technology \'bemjson.js\'', function () {
        bemtools.addPreprocessor(['bemjson.js'], 'css').must.eql(['bemjson.js', 'css']);
    });

    it('must add preprocessor \'stylus\' as default', function () {
        bemtools.addPreprocessor([], undefined).must.eql(['stylus', 'css']);
    });

    it('must add \'ie.css\'', function () {
        var techs = ['ie6.css', 'ie7.css', 'ie8.css', 'ie9.css'],
            output = ['ie.css', 'ie6.css', 'ie7.css', 'ie8.css', 'ie9.css'];

        bemtools.addIe(techs).must.eql(output);
    });

    it('must not add \'ie.css\'', function () {
        var techs = ['ie.css', 'ie6.css', 'ie7.css', 'ie8.css', 'ie9.css'],
            output = ['ie.css', 'ie6.css', 'ie7.css', 'ie8.css', 'ie9.css'];

        bemtools.addIe(techs).must.eql(output);
    });

    it('must add template engine \'bemhtml\' before technology \'node.js\'', function () {
        bemtools.addTemplateEngine(['css', 'node.js'], 'bemhtml').must.eql(['css', 'bemhtml', 'node.js']);
    });

    it('must add template engine \'bemhtml\' before technology \'browser.js+bemhtml\'', function () {
        var techs = ['css', 'browser.js+bemhtml'],
            output = ['css', 'bemhtml', 'browser.js+bemhtml'];

        bemtools.addTemplateEngine(techs, 'bemhtml').must.eql(output);
    });

    it('must not add template engine ', function () {
        bemtools.addTemplateEngine([], 'my').must.eql([]);
    });

    it('must get technology \'bemjson.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.bemjson.json', 'utf-8'));

        bemtools.getTechnologies(config, ['bemjson.js', 'css'], false).must.eql(output);
    });

    it('must get technology \'stylus\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.stylus.json', 'utf-8'));

        bemtools.getTechnologies(config, ['stylus', 'css'], false).must.eql(output);
    });

    it('must get technology \'stylus\' + \'autoprefixer\'', function () {
        var path = 'test/fixtures/bem-tools/getTechnologies.stylus+autoprefixer.json',
            output = JSON.parse(fs.readFileSync(path, 'utf-8'));

        bemtools.getTechnologies(config, ['stylus', 'css'], true).must.eql(output);
    });

    it('must get technology \'roole\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.roole.json', 'utf-8'));

        bemtools.getTechnologies(config, ['roole', 'css'], false).must.eql(output);
    });

    it('must get technology \'roole\' + \'autoprefixer\'', function () {
        var path = 'test/fixtures/bem-tools/getTechnologies.roole+autoprefixer.json',
            output = JSON.parse(fs.readFileSync(path, 'utf-8'));

        bemtools.getTechnologies(config, ['roole', 'css'], true).must.eql(output);
    });

    it('must get technology \'less\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.less.json', 'utf-8'));

        bemtools.getTechnologies(config, ['less', 'css'], false).must.eql(output);
    });

    it('must get technology \'less\' + \'autoprefixer\'', function () {
        var path = 'test/fixtures/bem-tools/getTechnologies.less+autoprefixer.json',
            output = JSON.parse(fs.readFileSync(path, 'utf-8'));

        bemtools.getTechnologies(config, ['less', 'css'], true).must.eql(output);
    });

    it('must get technology \'css\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.css.json', 'utf-8'));

        bemtools.getTechnologies(config, ['css'], false).must.eql(output);
    });

    it('must get technology \'css\' + \'autoprefixer\'', function () {
        var path = 'test/fixtures/bem-tools/getTechnologies.css+autoprefixer.json',
            output = JSON.parse(fs.readFileSync(path, 'utf-8'));

        bemtools.getTechnologies(config, ['css'], true).must.eql(output);
    });

    it('must get technologies \'ieN.css\'', function () {
        var techs = ['css', 'ie.css', 'ie6.css', 'ie7.css', 'ie8.css', 'ie9.css'],
            output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.ie.json', 'utf-8'));

        bemtools.getTechnologies(config, techs, false).must.eql(output);
    });

    it('must get technology \'bemtree\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.bemtree.json', 'utf-8'));

        bemtools.getTechnologies(config, ['css', 'bemtree'], false).must.eql(output);
    });

    it('must get technology \'bemhtml\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.bemhtml.json', 'utf-8'));

        bemtools.getTechnologies(config, ['css', 'bemhtml'], false).must.eql(output);
    });

    it('must get technology \'node.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.node.json', 'utf-8'));

        bemtools.getTechnologies(config, ['css', 'node.js'], false).must.eql(output);
    });

    it('must get technology \'browser.js+bemhtml\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.browser.json', 'utf-8'));

        bemtools.getTechnologies(config, ['css', 'browser.js+bemhtml'], false).must.eql(output);
    });

    it('must get technology \'html\'', function () {
        var techs = ['bemjson.js', 'css', 'bemhtml', 'html'],
            output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.html.json', 'utf-8'));

        bemtools.getTechnologies(config, techs, false).must.eql(output);
    });

    it('must get all technologies', function () {
        var techs = [
                'bemjson.js',
                'css',
                'ie.css',
                'ie6.css',
                'ie7.css',
                'ie8.css',
                'ie9.css',
                'bemtree',
                'bemhtml',
                'node.js',
                'browser.js+bemhtml',
                'html'
            ],
            output = JSON.parse(fs.readFileSync('test/fixtures/bem-tools/getTechnologies.all.json', 'utf-8'));

        bemtools.getTechnologies(config, techs, false).must.eql(output);
    });

    it('must get browsers for all platforms', function () {
        var platforms = {
                desktop: ['common', 'desktop'],
                'touch-pad': ['common', 'touch', 'touch-pad'],
                'touch-phone': ['common', 'touch', 'touch-phone']
            },
            output = {
                desktop: ['last 2 versions', 'ie 10', 'ff 24', 'opera 12.16'],
                'touch-pad': ['android 4', 'ios 5'],
                'touch-phone': ['android 4', 'ios 6', 'ie 10']
            };

        bemtools.getBrowsers(config, platforms).must.eql(output);
    });

    it('must get styles', function () {
        var techs = ['css', 'ie.css', 'ie6.css', 'ie7.css', 'ie8.css', 'ie9.css'],
            output = {
                css: [{ elem: 'css', url: '_index.css' }],
                ies: ['', 6, 7, 8, 9].map(function (i) {
                    return {
                        elem: 'css',
                        url: '_index.ie' + i + '.css'
                    };
                })
            };

        bemtools.getStyles(techs).must.eql(output);
    });

    it('must get scripts', function () {
        bemtools.getScripts(['browser.js+bemhtml']).must.eql([{ elem: 'js', url: '_index.js' }]);
    });
});

// ---------------------------------------

// ENB
// ---------------------------------------

describe('\'ENB\'', function () {
    it('must get all platforms without design', function () {
        var pls = [
                ['common', 'desktop'],
                ['common', 'touch', 'touch-pad'],
                ['common', 'touch', 'touch-phone']
            ],
            libs = [
                { name: 'bem-core', version: '' },
                { name: 'bem-components', version: '' }
            ],
            output = JSON.parse(fs.readFileSync('test/fixtures/enb/getPlatforms.no.design.json', 'utf-8'));

        enb.getPlatforms(pls, libs, false).must.eql(output);
    });

    it('must get all platforms with design', function () {
        var pls = [
                ['common', 'desktop'],
                ['common', 'touch', 'touch-pad'],
                ['common', 'touch', 'touch-phone']
            ],
            libs = [
                { name: 'bem-core', version: '' },
                { name: 'bem-components', version: '' }
            ],
            output = JSON.parse(fs.readFileSync('test/fixtures/enb/getPlatforms.design.json', 'utf-8'));

        enb.getPlatforms(pls, libs, true).must.eql(output);
    });

    it('must add preprocessor', function () {
        enb.addPreprocessor([], 'stylus').must.eql(['stylus']);
    });

    it('must add preprocessor \'stylus\' as default', function () {
        enb.addPreprocessor([], undefined).must.eql(['stylus']);
    });

    it('must add template engine', function () {
        enb.addTemplateEngine(['css'], 'bh').must.eql(['css', 'bh']);
    });

    it('must not add template engine', function () {
        enb.addTemplateEngine(['css'], 'my').must.eql(['css']);
    });

    it('must get technology \'bemjson.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.bemjson.json', 'utf-8'));

        enb.getTechnologies(config, ['bemjson.js', 'css'], false, []).must.eql(output);
    });

    it('must get technology \'stylus\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.stylus.json', 'utf-8'));

        enb.getTechnologies(config, ['stylus'], false, []).must.eql(output);
    });

    it('must get technology \'stylus\' + \'autoprefixer\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.stylus+autoprefixer.json', 'utf-8'));

        enb.getTechnologies(config, ['stylus'], true, []).must.eql(output);
    });

    it('must get technology \'roole\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.roole.json', 'utf-8'));

        enb.getTechnologies(config, ['roole'], false, []).must.eql(output);
    });

    it('must get technology \'roole\' + \'autoprefixer\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.roole+autoprefixer.json', 'utf-8'));

        enb.getTechnologies(config, ['roole'], true, []).must.eql(output);
    });

    it('must get technology \'less\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.less.json', 'utf-8'));

        enb.getTechnologies(config, ['less'], false, []).must.eql(output);
    });

    it('must get technology \'less\' + \'autoprefixer\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.less+autoprefixer.json', 'utf-8'));

        enb.getTechnologies(config, ['less'], true, []).must.eql(output);
    });

    it('must get technology \'css\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.css.json', 'utf-8'));

        enb.getTechnologies(config, ['css'], false, []).must.eql(output);
    });

    it('must get technology \'css\' + \'autoprefixer\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.css+autoprefixer.json', 'utf-8'));

        enb.getTechnologies(config, ['css'], true, []).must.eql(output);
    });

    it('must get minimized technology \'css\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.css.min.json', 'utf-8'));

        enb.getTechnologies(config, ['css'], false, ['css']).must.eql(output);
    });

    it('must get minimized technology \'css\' + \'autoprefixer\'', function () {
        var testFile = fs.readFileSync('test/fixtures/enb/getTechnologies.css+autoprefixer.min.json', 'utf-8'),
            output = JSON.parse(testFile);

        enb.getTechnologies(config, ['css'], true, ['css']).must.eql(output);
    });

    it('must get technologies \'ieN.css\'', function () {
        var techs = ['ie.css', 'ie6.css', 'ie7.css', 'ie8.css', 'ie9.css', 'css'],
            output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.ie.json', 'utf-8'));

        enb.getTechnologies(config, techs, false, []).must.eql(output);
    });

    it('must get minimized technologies \'ieN.css\'', function () {
        var techs = ['ie.css', 'ie6.css', 'ie7.css', 'ie8.css', 'ie9.css', 'css'],
            toMinify = ['ie.css', 'ie6.css', 'ie7.css', 'ie8.css', 'ie9.css', 'css'],
            output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.ie.min.json', 'utf-8'));

        enb.getTechnologies(config, techs, false, toMinify).must.eql(output);
    });

    it('must get technology \'bemtree.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.bemtree.json', 'utf-8'));

        enb.getTechnologies(config, ['bemtree.js', 'css'], false, []).must.eql(output);
    });

    it('must get minimized technology \'bemtree.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.bemtree.min.json', 'utf-8'));

        enb.getTechnologies(config, ['bemtree.js', 'css'], false, ['bemtree.js']).must.eql(output);
    });

    it('must get technology \'node.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.node.json', 'utf-8'));

        enb.getTechnologies(config, ['node.js', 'css'], false, []).must.eql(output);
    });

    it('must get minimized technology \'node.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.node.min.json', 'utf-8'));

        enb.getTechnologies(config, ['node.js', 'css'], false, ['node.js']).must.eql(output);
    });

    it('must get technology \'browser.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.browser.json', 'utf-8'));

        enb.getTechnologies(config, ['browser.js', 'css'], false, []).must.eql(output);
    });

    it('must get minimized technology \'browser.js\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.browser.min.json', 'utf-8'));

        enb.getTechnologies(config, ['browser.js', 'css'], false, ['js']).must.eql(output);
    });

    it('must get technology \'bemhtml\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.bemhtml.json', 'utf-8'));

        enb.getTechnologies(config, ['bemhtml', 'css'], false, []).must.eql(output);
    });

    it('must get minimized technology \'bemhtml\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.bemhtml.min.json', 'utf-8'));

        enb.getTechnologies(config, ['bemhtml', 'css'], false, ['bemhtml.js']).must.eql(output);
    });

    it('must get technology \'bh\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.bh.json', 'utf-8'));

        enb.getTechnologies(config, ['bh', 'css'], false, []).must.eql(output);
    });

    it('must get minimized technology \'bh\'', function () {
        var output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.bh.min.json', 'utf-8'));

        enb.getTechnologies(config, ['bh', 'css'], false, ['bh.js']).must.eql(output);
    });

    it('must get technology \'html\' --> \'bemhtml\'', function () {
        var techs = ['bemjson.js', 'css', 'bemhtml', 'html'],
            output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.html.bemhtml.json', 'utf-8'));

        enb.getTechnologies(config, techs, false, []).must.eql(output);
    });

    it('must get technology \'html\' --> \'bh\'', function () {
        var techs = ['bemjson.js', 'css', 'bh', 'html'],
            output = JSON.parse(fs.readFileSync('test/fixtures/enb/getTechnologies.html.bh.json', 'utf-8'));

        enb.getTechnologies(config, techs, false, []).must.eql(output);
    });

    it('must get browsers for all platforms', function () {
        var platforms = {
                desktop: ['common', 'desktop'],
                'touch-pad': ['common', 'touch', 'touch-pad'],
                'touch-phone': ['common', 'touch', 'touch-phone']
            },
            output = {
                desktop: ['last 2 versions', 'ie 10', 'ff 24', 'opera 12.16'],
                'touch-pad': ['android 4', 'ios 5'],
                'touch-phone': ['android 4', 'ios 6', 'ie 10']
            };

        enb.getBrowsers(config, platforms).must.eql(output);
    });

    it('must get styles', function () {
        var techs = ['?.css', '?.ie.css', '?.ie6.css', '?.ie7.css', '?.ie8.css', '?.ie9.css'],
            output = {
                css: [{ elem: 'css', url: 'index.css' }],
                ies: ['', 6, 7, 8, 9].map(function (i) {
                    return {
                        elem: 'css',
                        url: 'index.ie' + i + '.css'
                    };
                })
            };

        enb.getStyles(techs).must.eql(output);
    });

    it('must get minimized styles', function () {
        var techs = ['_?.css', '_?.ie.css', '_?.ie6.css', '_?.ie7.css', '_?.ie8.css', '_?.ie9.css'],
            output = {
                css: [{ elem: 'css', url: '_index.css' }],
                ies: ['', 6, 7, 8, 9].map(function (i) {
                    return {
                        elem: 'css',
                        url: '_index.ie' + i + '.css'
                    };
                })
            };

        enb.getStyles(techs).must.eql(output);
    });

    it('must get scripts', function () {
        enb.getScripts(['?.js']).must.eql([{ elem: 'js', url: 'index.js' }]);
    });

    it('must get minimized scripts', function () {
        enb.getScripts(['_?.js']).must.eql([{ elem: 'js', url: '_index.js' }]);
    });
});

// ---------------------------------------
