function UpdateFrequencyRadiogroup()
{
  var disabled = !gDialog.checkUpdatesCheckbox.checked;
  gDialog.atLaunchRadio.disabled = disabled;
  gDialog.oncePerDayRadio.disabled = disabled;
  gDialog.manuallyRadio.disabled = disabled;
}

function OnUpdatePaneLoad()
{
  GetUIElements();
  UpdateFrequencyRadiogroup();
}

function OpenPrivacyPolicy()
{
  loadExternalURL("http://bluegriffon.org/pages/Privacy-Policy");
}

function loadExternalURL( url )
{
  if (url)
  {
    var ioService = Components.classes["@mozilla.org/network/io-service;1"]
                              .getService(Components.interfaces.nsIIOService);
    var uri = ioService.newURI(url, null, null);
    var extProtocolSvc = Components.classes["@mozilla.org/uriloader/external-protocol-service;1"]
                                   .getService(Components.interfaces.nsIExternalProtocolService);

    extProtocolSvc.loadUrl(uri);
  }
}

function CheckNow()
{
  BGUpdateManager.check();
}

function ErrorOnUpdate()
{
  PromptUtils.alertWithTitle("Software updates", "Unable to check availability", window);
}

function BlueGriffonIsUpToDate()
{
  PromptUtils.alertWithTitle("Software updates", "BlueGriffon is up to date", window);
}
