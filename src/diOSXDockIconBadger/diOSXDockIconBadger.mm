/* -*- Mode: C++; tab-width: 4; indent-tabs-mode: nil; c-basic-offset: 4 -*- */
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
 * The Original Code is Mac OSX New Mail Notification Code..
 *
 * The Initial Developer of the Original Code is
 * The Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2005
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *  Scott MacGregor <mscott@mozilla.org>
 *  Jon Baumgartner <jon@bergenstreetsoftware.com>
 *  Daniel Glazman <daniel@glazman.org>
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

#include "diIOSXDockIconBadger.h"
#include "diOSXDockIconBadgerCIID.h"
#include "diOSXDockIconBadger.h"

#include "nscore.h"
#include <Carbon/Carbon.h>
#import <Cocoa/Cocoa.h>

#include "nsCOMPtr.h"
#include "nsIBaseWindow.h"
#include "nsIWidget.h"

diOSXDockIconBadger::diOSXDockIconBadger()
{
}

diOSXDockIconBadger::~diOSXDockIconBadger()
{
}

NS_IMPL_ISUPPORTS1(diOSXDockIconBadger, diIOSXDockIconBadger)

NS_IMETHODIMP
diOSXDockIconBadger::RestoreIcon()
{
  NSDockTile *aTile = [[NSApplication sharedApplication] dockTile];
  [aTile setBadgeLabel: nil];
	return NS_OK;
}

NS_IMETHODIMP
diOSXDockIconBadger::SetIconValue(int aCount)
{
  NSDockTile *aTile = [[NSApplication sharedApplication] dockTile];
  [aTile setBadgeLabel:[NSString stringWithFormat:@"%i", aCount]];
  return NS_OK;
}

NS_IMETHODIMP
diOSXDockIconBadger::SetDocumentEdited(nsIBaseWindow *aWindow, PRBool aIsEdited) 
{
  nsCOMPtr<nsIWidget> widget = nsnull;
  aWindow->GetMainWidget(getter_AddRefs(widget));
  if (widget) {
    NSWindow *cocoaWindow = (NSWindow*)widget->GetNativeData(NS_NATIVE_WINDOW);
    [cocoaWindow setDocumentEdited:aIsEdited];
  }
  return NS_OK;
}
