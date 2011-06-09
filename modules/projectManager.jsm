/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is BlueGriffon.
 *
 * The Initial Developer of the Original Code is
 * Disruptive Innovations SARL.
 * Portions created by the Initial Developer are Copyright (C) 2006
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Daniel Glazman <daniel.glazman@disruptive-innovations.com>, Original author
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

Components.utils.import("resource://app/modules/fireFtp.jsm");

var EXPORTED_SYMBOLS = ["ProjectManager"];

var ProjectManager = {

  projects: {},

  getDBConn: function()
  {
    var file = Components.classes["@mozilla.org/file/directory_service;1"]
                         .getService(Components.interfaces.nsIProperties)
                         .get("ProfD", Components.interfaces.nsIFile);
    file.append("webprojects.sqlite");
    
    var storageService = Components.classes["@mozilla.org/storage/service;1"]
                            .getService(Components.interfaces.mozIStorageService);
    return storageService.openDatabase(file);
  },

  init: function()
  {
    var mDBConn = this.getDBConn();    
    mDBConn.executeSimpleSQL("CREATE TABLE IF NOT EXISTS 'projects' ( \
'name' VARCHAR PRIMARY KEY NOT NULL, \
'url' VARCHAR NOT NULL, \
'storageChoice' VARCHAR NOT NULL, \
'hostname' VARCHAR NOT NULL, \
'rootpath' VARCHAR NOT NULL, \
'user' VARCHAR NOT NULL, \
'passiveMode' VARCHAR NOT NULL, \
'ipv6Mode' VARCHAR NOT NULL, \
'port' VARCHAR NOT NULL, \
'localStoreHome' VARCHAR NOT NULL, \
'exclusions' VARCHAR NOT NULL, \
'timeShift' VARCHAR NOT NULL)");

  	mDBConn.close();

    this.loadProjects();
  },

  loadProjects: function()
  {
    this.projects = {};

    var dbConn = this.getDBConn();
    var statement = dbConn.createStatement("SELECT * FROM 'projects'");

    while (statement.executeStep()) {
      var name           = statement.getString(0);
      var url            = statement.getString(1);
      var storageChoice  = statement.getString(2);
      var hostname       = statement.getString(3);
      var rootpath       = statement.getString(4);
      var user           = statement.getString(5);
      var passiveMode    = statement.getString(6);
      var ipv6Mode       = statement.getString(7);
      var port           = statement.getString(8);
      var localStoreHome = statement.getString(9)
      var exclusions     = statement.getString(10);
      var timeShift      = statement.getString(11);
  
      this.projects[name] = {
        url: url,
        storageChoice: storageChoice,
        hostname: hostname,
        rootpath: rootpath,
        user: user,
        passiveMode: passiveMode,
        ipv6Mode: ipv6Mode,
        port: port,
        localStoreHome: localStoreHome,
        exclusions: exclusions,
        timeShift: timeShift
      };
    }
  
    statement.finalize();
    dbConn.close();
  },

  deleteProject: function(aName)
  {
    if (aName in this.projects) { // sanity check
      var dbConn = this.getDBConn();
      var statement = dbConn.createStatement("DELETE FROM 'projects' WHERE name=?1");
    
      statement.bindUTF8StringParameter(0, aName);
       
      statement.execute();
      statement.finalize();
    
      dbConn.close();
      delete this.projects[aName];
    }
  },


  addProject: function(name,
                       url,
                       storageChoice,
                       hostname,
                       rootpath,
                       user,
                       passiveMode,
                       ipv6Mode,
                       port,
                       localStoreHome,
                       exclusions,
                       timeShift)
  {
    if (!(name in this.projects)) { // sanity check
      var dbConn = this.getDBConn();
      var statement = dbConn.createStatement("INSERT INTO 'projects' ('name', 'url', 'storageChoice', 'hostname', 'rootpath', 'user', 'passiveMode', 'ipv6Mode', 'port', 'localStoreHome', 'exclusions', 'timeShift') VALUES(?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)");
      statement.bindUTF8StringParameter(0, name);
      statement.bindUTF8StringParameter(1, url);
      statement.bindUTF8StringParameter(2, storageChoice);
      statement.bindUTF8StringParameter(3, hostname);
      statement.bindUTF8StringParameter(4, rootpath);
      statement.bindUTF8StringParameter(5, user);
      statement.bindUTF8StringParameter(6, passiveMode);
      statement.bindUTF8StringParameter(7, ipv6Mode);
      statement.bindUTF8StringParameter(8, port);
      statement.bindUTF8StringParameter(9, localStoreHome);
      statement.bindUTF8StringParameter(10, exclusions);
      statement.bindUTF8StringParameter(11, timeShift);

      statement.execute();
      statement.finalize();
    
      dbConn.close();
      this.projects[name] = {
        url: url,
        storageChoice: storageChoice,
        hostname: hostname,
        rootpath: rootpath,
        user: user,
        passiveMode: passiveMode,
        ipv6Mode: ipv6Mode,
        port: port,
        localStoreHome: localStoreHome,
        exclusions: exclusions,
        timeShift: timeShift
      };
    }
  },

  modifyProject: function(name,
                          url,
                          storageChoice,
                          hostname,
                          rootpath,
                          user,
                          passiveMode,
                          ipv6Mode,
                          port,
                          localStoreHome,
                          exclusions,
                          timeShift)
  {
    if ((name in this.projects)) { // sanity check
      var dbConn = this.getDBConn();
      var statement = dbConn.createStatement("UPDATE 'projects' SET \
url=?2,\
storageChoice=?3,\
hostname=?4,\
rootpath=?5,\
user=?6,\
passiveMode=?7,\
ipv6Mode=?8,\
port=?9,\
localStoreHome=?10,\
exclusions=?11,\
timeShift=?12 WHERE name=?1");
      statement.bindUTF8StringParameter(0, name);
      statement.bindUTF8StringParameter(1, url);
      statement.bindUTF8StringParameter(2, storageChoice);
      statement.bindUTF8StringParameter(3, hostname);
      statement.bindUTF8StringParameter(4, rootpath);
      statement.bindUTF8StringParameter(5, user);
      statement.bindUTF8StringParameter(6, passiveMode);
      statement.bindUTF8StringParameter(7, ipv6Mode);
      statement.bindUTF8StringParameter(8, port);
      statement.bindUTF8StringParameter(9, localStoreHome);
      statement.bindUTF8StringParameter(10, exclusions);
      statement.bindUTF8StringParameter(11, timeShift);
    
      statement.execute();
      statement.finalize();
    
      dbConn.close();
      this.projects[name] = {
        url: url,
        storageChoice: storageChoice,
        hostname: hostname,
        rootpath: rootpath,
        user: user,
        passiveMode: passiveMode,
        ipv6Mode: ipv6Mode,
        port: port,
        localStoreHome: localStoreHome,
        exclusions: exclusions,
        timeShift: timeShift
      };
    }
  },

  isExistingProject: function(aName)
  {
    return (aName in this.projects);
  },

  getProjectForUrlSpec: function(aUrlSpec)
  {
    for (var name in this.projects) {
      var localStoreHome = this.projects[name].localStoreHome;
      if (aUrlSpec.substr(0, localStoreHome.length) == localStoreHome)
        return {name: name, project: this.projects };
    }
    return null;
  }
};