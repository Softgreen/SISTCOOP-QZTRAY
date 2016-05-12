(function () {
    'use strict';

    window.qz.api.setPromiseType(Promise.fromCallback);

    var module = angular.module('ng-qzTray', ['LocalStorageModule'])
        .constant('QzTray', window.qz)
        .constant('QzTrayStorage', {
            printer: {
                name: undefined
            },
            options: {
                host: 'localhost',
                usingSecure: true,
                retries: 5,
                delay: 1
            },
            config: {

            }
        })
        .provider('QzTrayConfig', function () {
            var _autoConnect = false;
            var _localStorage = false;
            var _localStorageName = 'QzTrayConfigLocalStorage';

            return {
                setAutoConnect: function (value) {
                    _autoConnect = value;
                },
                setLocalStorage: function (value) {
                    _localStorage = value;
                },
                setLocalStorageName: function (value) {
                    _localStorageName = value;
                },

                $get: function () {
                    return {
                        autoConnect: _autoConnect,
                        localStorage: _localStorage,
                        localStorageName: _localStorageName
                    };
                }
            };
        })
        .factory('QzTrayService', ['QzTray', 'QzTrayConfig', 'localStorageService', function (QzTray, QzTrayConfig, localStorageService) {

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

            service.save = function () {
                localStorageService.set(QzTrayConfig.localStorageName, JSON.stringify(service.cfg));
            };

            service.getUpdatedConfig = function () {
                if (service.cfg == null) {
                    service.cfg = QzTray.configs.create(null);
                }
                service.updateConfig();
                return service.cfg
            };
            service.updateConfig = function (config) {
                service.cfg.reconfigure(config);
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
            service.getPrinter = function () {
                return service.cfg.getPrinter();
            };
            service.getOptions = function () {
                return service.cfg.getOptions();
            };

            service.print = function (printData, config) {
                var config = service.getUpdatedConfig();
                return QzTray.print(config, printData);
            };

            service.setPrinter = function (printer) {
                var cf = service.getUpdatedConfig();
                cf.setPrinter(printer);
            };

            return service;
        }])
        .factory('QzTrayPrinter', function () {

        })
        .run(function (QzTrayConfig, QzTrayService, QzTrayStorage, localStorageService) {

            var showError = function (err) {
                alert(err);
            };

            /// If localStorage is enabled, load config from localstorage
            if (QzTrayConfig.localStorage) {
                angular.extend(QzTrayStorage, angular.fromJson(localStorageService.get(QzTrayConfig.localStorageName)));
            }

            /// If autoConnect is enabled
            if (QzTrayConfig.autoConnect) {
                QzTrayService.startConnection(QzTrayStorage.options).then(function () {
                    if (QzTrayStorage.printer.name) {
                        QzTrayService.findPrinter(QzTrayStorage.printer.name).then(function (data) {
                            QzTrayService.setPrinter(QzTrayStorage.printer);
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
