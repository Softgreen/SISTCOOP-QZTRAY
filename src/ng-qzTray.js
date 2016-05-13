(function () {
    'use strict';

    var module = angular.module('ng-qzTray', ['LocalStorageModule'])
        .constant('QzTray', window.qz)
        .constant('QzTrayConnectConfig', {
            host: 'localhost',
            usingSecure: true,
            keepAlive: 60,
            retries: 5,
            delay: 1
        })
        .constant('QzTrayPrinterConfig', {
            printer: {
                name: undefined
            },
            config: {}
        })
        .provider('QzTrayConfig', function () {
            var _autoConnect = false;

            var _localStorage = false;
            var _connectConfigLocalStorageName = 'opensales_connectConfigLocalStorageName';
            var _printerConfigLocalStorageName = 'opensales_printerConfigLocalStorageName';

            return {
                setAutoConnect: function (value) {
                    _autoConnect = value;
                },
                setLocalStorage: function (value) {
                    _localStorage = value;
                },
                setConnectConfigLocalStorageName: function (value) {
                    _connectConfigLocalStorageName = value;
                },
                setPrinterConfigLocalStorageName: function (value) {
                    _printerConfigLocalStorageName = value;
                },

                $get: function () {
                    return {
                        autoConnect: _autoConnect,
                        localStorage: _localStorage,
                        connectConfigLocalStorageName: _connectConfigLocalStorageName,
                        printerConfigLocalStorageName: _printerConfigLocalStorageName
                    };
                }
            };
        })
        .factory('QzTrayService', ['$rootScope', 'QzTray', 'QzTrayConnectConfig', 'QzTrayPrinterConfig', 'QzTrayConfig', 'localStorageService', function ($rootScope, QzTray, QzTrayConnectConfig, QzTrayPrinterConfig, QzTrayConfig, localStorageService) {

            var service = {};
            service.cfg = null;

            /// Connection ///
            service.startConnection = function (config) {
                if (!QzTray.websocket.isActive()) {
                    return QzTray.websocket.connect(config);
                } else {
                    throw new Error('An active connection with QZ already exists.');
                }
            };
            service.endConnection = function () {
                if (QzTray.websocket.isActive()) {
                    return QzTray.websocket.disconnect();
                } else {
                    throw new Error('No active connection with QZ exists.');
                }
            };
            service.isActive = function () {
                return QzTray.websocket.isActive();
            };

            /// Storage ///
            service.saveConnectConfig = function () {
                localStorageService.set(QzTrayConfig.connectConfigLocalStorageName, JSON.stringify(QzTrayConnectConfig));
            };
            service.savePrinterConfig = function () {
                localStorageService.set(QzTrayConfig.printerConfigLocalStorageName, JSON.stringify(QzTrayPrinterConfig));
            };

            /// Update config ///
            service.getUpdatedConfig = function () {
                if (service.cfg == null) {
                    service.cfg = QzTray.configs.create(null);
                }
                service.updateConfig();
                return service.cfg
            };
            service.updateConfig = function (config) {
                service.cfg.reconfigure(config);
                if(!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            };


            /// Detection ///
            service.findPrinter = function (query, set) {
                return QzTray.printers.find(query);
            };
            service.findDefaultPrinter = function () {
                return QzTray.printers.getDefault();
            };
            service.findPrinters = function () {
                return QzTray.printers.find();
            };

            /// Printers ///
            service.getConfig = function () {
                return service.cfg.config;
            };
            service.getPrinter = function () {
                return service.cfg.getPrinter();
            };
            service.getOptions = function () {
                return service.cfg.getOptions();
            };

            service.print = function (printData) {
                var config = service.getUpdatedConfig();
                return QzTray.print(config, printData);
            };

            service.setPrinter = function (printer) {
                var cf = service.getUpdatedConfig();
                cf.setPrinter(printer);
                if(!$rootScope.$$phase) {
                    $rootScope.$apply();
                }
            };

            return service;
        }])
        .factory('QzTrayPrinter', function () {

        })
        .run(function (QzTrayConfig, QzTrayService, QzTrayConnectConfig, QzTrayPrinterConfig, localStorageService) {

            var showError = function (err) {
                alert(err);
            };

            /// If localStorage is enabled, load config from localstorage
            if (QzTrayConfig.localStorage) {
                angular.extend(QzTrayConnectConfig, angular.fromJson(localStorageService.get(QzTrayConfig.connectConfigLocalStorageName)));
                angular.extend(QzTrayPrinterConfig, angular.fromJson(localStorageService.get(QzTrayConfig.printerConfigLocalStorageName)));
            }

            /// If autoConnect is enabled
            if (QzTrayConfig.autoConnect) {
                QzTrayService.startConnection(QzTrayConnectConfig).then(function () {
                    if (QzTrayPrinterConfig.printer.name) {
                        QzTrayService.findPrinter(QzTrayPrinterConfig.printer.name).then(function (data) {
                            QzTrayService.setPrinter(QzTrayPrinterConfig.printer);
                        }).catch(showError);
                    } else {
                        QzTrayService.findDefaultPrinter().then(function (data) {
                            QzTrayService.setPrinter(data);
                        }).catch(showError);
                    }
                }).catch(showError);
            }

        });

}());
