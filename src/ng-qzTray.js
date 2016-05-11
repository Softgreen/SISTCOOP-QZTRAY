(function () {
    'use strict';

    var module = angular.module('ng-qzTray', [])
        .constant('QzTray', qz)
        .constant('QzTrayOptions', {
            allowHtml: false,
            authentication: 'direct', //direct, server, anonymous
            certificate: '-----BEGIN CERTIFICATE-----\n' +
            'MIIFAzCCAuugAwIBAgICEAIwDQYJKoZIhvcNAQEFBQAwgZgxCzAJBgNVBAYTAlVT\n' +
            'MQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0cmllcywgTExDMRswGQYD\n' +
            'VQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMMEHF6aW5kdXN0cmllcy5j\n' +
            'b20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1c3RyaWVzLmNvbTAeFw0x\n' +
            'NTAzMTkwMjM4NDVaFw0yNTAzMTkwMjM4NDVaMHMxCzAJBgNVBAYTAkFBMRMwEQYD\n' +
            'VQQIDApTb21lIFN0YXRlMQ0wCwYDVQQKDAREZW1vMQ0wCwYDVQQLDAREZW1vMRIw\n' +
            'EAYDVQQDDAlsb2NhbGhvc3QxHTAbBgkqhkiG9w0BCQEWDnJvb3RAbG9jYWxob3N0\n' +
            'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtFzbBDRTDHHmlSVQLqjY\n' +
            'aoGax7ql3XgRGdhZlNEJPZDs5482ty34J4sI2ZK2yC8YkZ/x+WCSveUgDQIVJ8oK\n' +
            'D4jtAPxqHnfSr9RAbvB1GQoiYLxhfxEp/+zfB9dBKDTRZR2nJm/mMsavY2DnSzLp\n' +
            't7PJOjt3BdtISRtGMRsWmRHRfy882msBxsYug22odnT1OdaJQ54bWJT5iJnceBV2\n' +
            '1oOqWSg5hU1MupZRxxHbzI61EpTLlxXJQ7YNSwwiDzjaxGrufxc4eZnzGQ1A8h1u\n' +
            'jTaG84S1MWvG7BfcPLW+sya+PkrQWMOCIgXrQnAsUgqQrgxQ8Ocq3G4X9UvBy5VR\n' +
            'CwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdl\n' +
            'bmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUpG420UhvfwAFMr+8vf3pJunQ\n' +
            'gH4wHwYDVR0jBBgwFoAUkKZQt4TUuepf8gWEE3hF6Kl1VFwwDQYJKoZIhvcNAQEF\n' +
            'BQADggIBAFXr6G1g7yYVHg6uGfh1nK2jhpKBAOA+OtZQLNHYlBgoAuRRNWdE9/v4\n' +
            'J/3Jeid2DAyihm2j92qsQJXkyxBgdTLG+ncILlRElXvG7IrOh3tq/TttdzLcMjaR\n' +
            '8w/AkVDLNL0z35shNXih2F9JlbNRGqbVhC7qZl+V1BITfx6mGc4ayke7C9Hm57X0\n' +
            'ak/NerAC/QXNs/bF17b+zsUt2ja5NVS8dDSC4JAkM1dD64Y26leYbPybB+FgOxFu\n' +
            'wou9gFxzwbdGLCGboi0lNLjEysHJBi90KjPUETbzMmoilHNJXw7egIo8yS5eq8RH\n' +
            'i2lS0GsQjYFMvplNVMATDXUPm9MKpCbZ7IlJ5eekhWqvErddcHbzCuUBkDZ7wX/j\n' +
            'unk/3DyXdTsSGuZk3/fLEsc4/YTujpAjVXiA1LCooQJ7SmNOpUa66TPz9O7Ufkng\n' +
            '+CoTSACmnlHdP7U9WLr5TYnmL9eoHwtb0hwENe1oFC5zClJoSX/7DRexSJfB7YBf\n' +
            'vn6JA2xy4C6PqximyCPisErNp85GUcZfo33Np1aywFv9H+a83rSUcV6kpE/jAZio\n' +
            '5qLpgIOisArj1HTM6goDWzKhLiR/AeG3IJvgbpr9Gr7uZmfFyQzUjvkJ9cybZRd+\n' +
            'G8azmpBBotmKsbtbAU/I/LVk8saeXznshOVVpDRYtVnjZeAneso7\n' +
            '-----END CERTIFICATE-----\n' +
            '--START INTERMEDIATE CERT--\n' +
            '-----BEGIN CERTIFICATE-----\n' +
            'MIIFEjCCA/qgAwIBAgICEAAwDQYJKoZIhvcNAQELBQAwgawxCzAJBgNVBAYTAlVT\n' +
            'MQswCQYDVQQIDAJOWTESMBAGA1UEBwwJQ2FuYXN0b3RhMRswGQYDVQQKDBJRWiBJ\n' +
            'bmR1c3RyaWVzLCBMTEMxGzAZBgNVBAsMElFaIEluZHVzdHJpZXMsIExMQzEZMBcG\n' +
            'A1UEAwwQcXppbmR1c3RyaWVzLmNvbTEnMCUGCSqGSIb3DQEJARYYc3VwcG9ydEBx\n' +
            'emluZHVzdHJpZXMuY29tMB4XDTE1MDMwMjAwNTAxOFoXDTM1MDMwMjAwNTAxOFow\n' +
            'gZgxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJOWTEbMBkGA1UECgwSUVogSW5kdXN0\n' +
            'cmllcywgTExDMRswGQYDVQQLDBJRWiBJbmR1c3RyaWVzLCBMTEMxGTAXBgNVBAMM\n' +
            'EHF6aW5kdXN0cmllcy5jb20xJzAlBgkqhkiG9w0BCQEWGHN1cHBvcnRAcXppbmR1\n' +
            'c3RyaWVzLmNvbTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBANTDgNLU\n' +
            'iohl/rQoZ2bTMHVEk1mA020LYhgfWjO0+GsLlbg5SvWVFWkv4ZgffuVRXLHrwz1H\n' +
            'YpMyo+Zh8ksJF9ssJWCwQGO5ciM6dmoryyB0VZHGY1blewdMuxieXP7Kr6XD3GRM\n' +
            'GAhEwTxjUzI3ksuRunX4IcnRXKYkg5pjs4nLEhXtIZWDLiXPUsyUAEq1U1qdL1AH\n' +
            'EtdK/L3zLATnhPB6ZiM+HzNG4aAPynSA38fpeeZ4R0tINMpFThwNgGUsxYKsP9kh\n' +
            '0gxGl8YHL6ZzC7BC8FXIB/0Wteng0+XLAVto56Pyxt7BdxtNVuVNNXgkCi9tMqVX\n' +
            'xOk3oIvODDt0UoQUZ/umUuoMuOLekYUpZVk4utCqXXlB4mVfS5/zWB6nVxFX8Io1\n' +
            '9FOiDLTwZVtBmzmeikzb6o1QLp9F2TAvlf8+DIGDOo0DpPQUtOUyLPCh5hBaDGFE\n' +
            'ZhE56qPCBiQIc4T2klWX/80C5NZnd/tJNxjyUyk7bjdDzhzT10CGRAsqxAnsjvMD\n' +
            '2KcMf3oXN4PNgyfpbfq2ipxJ1u777Gpbzyf0xoKwH9FYigmqfRH2N2pEdiYawKrX\n' +
            '6pyXzGM4cvQ5X1Yxf2x/+xdTLdVaLnZgwrdqwFYmDejGAldXlYDl3jbBHVM1v+uY\n' +
            '5ItGTjk+3vLrxmvGy5XFVG+8fF/xaVfo5TW5AgMBAAGjUDBOMB0GA1UdDgQWBBSQ\n' +
            'plC3hNS56l/yBYQTeEXoqXVUXDAfBgNVHSMEGDAWgBQDRcZNwPqOqQvagw9BpW0S\n' +
            'BkOpXjAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAJIO8SiNr9jpLQ\n' +
            'eUsFUmbueoxyI5L+P5eV92ceVOJ2tAlBA13vzF1NWlpSlrMmQcVUE/K4D01qtr0k\n' +
            'gDs6LUHvj2XXLpyEogitbBgipkQpwCTJVfC9bWYBwEotC7Y8mVjjEV7uXAT71GKT\n' +
            'x8XlB9maf+BTZGgyoulA5pTYJ++7s/xX9gzSWCa+eXGcjguBtYYXaAjjAqFGRAvu\n' +
            'pz1yrDWcA6H94HeErJKUXBakS0Jm/V33JDuVXY+aZ8EQi2kV82aZbNdXll/R6iGw\n' +
            '2ur4rDErnHsiphBgZB71C5FD4cdfSONTsYxmPmyUb5T+KLUouxZ9B0Wh28ucc1Lp\n' +
            'rbO7BnjW\n' +
            '-----END CERTIFICATE-----\n',
            serverUrl: 'localhost',
            rawOptions: {
                rawPerSpool: 1,
                rawEncoding: null,
                rawEndOfDoc: null,
                rawAltPrinting: false,
                rawCopies: 1
            },
            pixelOptions: {
                pxlColorType: 'color',
                pxlCopies: 1,
                pxlDensity: '',
                pxlDuplex: false,
                pxlInterpolation: '',
                pxlOrientation: '',
                pxlPaperThickness: null,
                pxlPrinterTray: null,
                pxlRotation: 0,
                pxlScale: true,
                pxlUnitsIN: true,

                pxlMargins: 0,
                pxlMarginsTop: 0,
                pxlMarginsRight: 0,
                pxlMarginsBottom: 0,
                pxlMarginsLeft: 0,
                pxlMarginsActive: false,
                pxlMarginsGroup: 'none', // obs,

                pxlSizeWidth: '',
                pxlSizeHeight: '',
                pxlSizeActive: false,
                pxlSizeGroup: 'none' //obs
            },
            serialOptions: {
                serialPort: '',
                serialCmd: '',
                serialBegin: '0x0002', // //String.fromCharCode(2)
                serialEnd: '0x000D', ////String.fromCharCode(13)

                serialBaud: 9600,
                serialData: 8,
                serialStop: 1,
                serialParity: 'NONE',
                serialFlow: 'NONE'
            },
            usbOptions: {
                usbVendor: '',
                usbProduct: '',

                usbInterface: '',
                usbEndpoint: '',
                usbData: '',
                usbResponse: 8,
                usbStream: 10
            }
        })
        .provider('QzTrayConfig', function () {
            var _startMethod = 'auto'; // auto, manual

            return {
                setStartMethod: function (startMethod) {
                    _startMethod = startMethod || _startMethod;
                },
                $get: function () {
                    return {
                        startMethod: _startMethod,
                        isAutoStart: function () {
                            return _startMethod === 'auto';
                        }
                    };
                }
            };
        })
        .factory('QzTrayService', ['$log', 'QzTray', function ($log, QzTray) {
            var service = {};
            service.cfg = null;
            service.qzTray = QzTray;

            service.getUpdatedConfig = function () {
                if (service.cfg == null) {
                    service.cfg = QzTray.configs.create(null);
                }
                updateConfig();
                return service.cfg
            };
            service.updateConfig = function (config) {
                service.cfg.reconfigure(config);
            };

            /// Connection ///
            service.launchQZ = function () {
                if (!QzTray.websocket.isActive()) {
                    window.location.assign('qz:launch');
                    startConnection({retries: 5, delay: 1}); //Retry 5 times, pausing 1 second between each attempt
                }
            };
            service.startConnection = function (config) {
                return QzTray.websocket.connect(config);
            };
            service.endConnection = function () {
                return QzTray.websocket.disconnect();
            };
            service.listNetworkInfo = function () {
                return QzTray.websocket.getNetworkInfo();
            };

            /// Detection ///
            service.findPrinter = function(name) {
                return QzTray.printers.find(name);
            };
            service.findDefaultPrinter = function () {
                return QzTray.printers.getDefault();
            };
            service.findPrinters = function() {
                return QzTray.printers.find();
            };

            /// Printers ///
            service.print = function (printData) {
                var config = getUpdatedConfig();
                return QzTray.print(config, printData);
            };

            /// Helpers ///
            service.displayMessage = function (message, type) {
                if (type === 'info') $log.info(message);
                else if (type === 'debug') $log.warn(message);
                else if (type === 'error') $log.error(message);
                else if (type === 'debug') $log.debug(message);
                else $log.log(message);
            };

            return service;
        }])
        .run(function (QzTrayConfig, QzTrayService) {
            console.log('Run');
            if(QzTrayConfig.isAutoStart) {
                console.log('Auto Load of Qz Tray');
                QzTrayService.launchQZ();
                console.log('QzTrayService');
            }
        });

}());
