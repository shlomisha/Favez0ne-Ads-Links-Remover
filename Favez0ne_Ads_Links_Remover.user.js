// ==UserScript==
// @id             Favez0ne_Ads_Links_Remover
// @name           Favez0ne Ads Links Remover
// @version        1.1.0
// @namespace      shlomisha
// @author         shlomisha
// @description    Avoids the ads page and redirects to the downloading link immediately. In addition, opens the links set
// @include        http://www.favez0ne.net/search.php
// @grant          none
// @run-at         document-end
// @updateURL      https://raw.githubusercontent.com/shlomisha/Favez0ne-Ads-Links-Remover/master/Favez0ne_Ads_Links_Remover.meta.js
// @downloadURL    https://raw.githubusercontent.com/shlomisha/Favez0ne-Ads-Links-Remover/master/Favez0ne_Ads_Links_Remover.user.js
// ==/UserScript==

var linksContainer = document.getElementById("pagetext");
var links = linksContainer.getElementsByTagName("a");
for (var i = 0; i < links.length; i++)
{
	links[i].href = links[i].href.substring(links[i].href.lastIndexOf("http://"));
}

// Openning the link set
var count = document.getElementById("pagetext").childNodes.length - 6;
for (var i = 0; i < count; i++)
{
	setDis(i);
}

// Sets the previous and next episodes links, if needed

document.getElementsByClassName("service-bar-bg")[0].style.height = "auto";

var field = document.getElementsByName("srch")[0];
if (/^(.+)(\d+|%)$/.test(field.value))
{
	var key = field.value;
	var buttons = "";
	
	if (key.charAt(key.length - 1) == "%")
	{
		if (count >= 2)
		{
			buttons = "גלול לפרק: ";
			for (var i = 1; i <= count; i++)
			{
				buttons += "<a href=\"#" + (i - 1) + "\">" + i + "</a> &nbsp;&nbsp;	";
			}
			
		}
	}
	else
	{
		var index = -1;
		var code;
		for (index = key.length - 1; index >= 0; index--)
		{
			code = key.charCodeAt(index);
			if ((code < 48) || (code > 57))
			{
				break;
			}
		}
		if (index >= 0)
		{
			var episodeName = key.substr(0, index + 1);
			var episodeNumber = key.substr(index + 1) * 1;
			var onclick = "";
		
			onclick = "document.getElementsByName('srch')[0].value = '" + episodeName + "1'; document.getElementsByTagName('form')[0].submit();";
			buttons += "ניווט בפרקים: <br /><input type=\"button\" onclick=\"" + onclick + "\" value=\"הראשון\" " + (episodeNumber >= 2 ? "" : "disabled=\"disabled\"") + " />";
			
			onclick = "document.getElementsByName('srch')[0].value = '" + episodeName + "%'; document.getElementsByTagName('form')[0].submit();";
			buttons += "<input type=\"button\" onclick=\"" + onclick + "\" value=\"הצג הכל\" />";
			
			onclick = "document.getElementsByName('srch')[0].value = '" + episodeName + (episodeNumber - 1) + "'; document.getElementsByTagName('form')[0].submit();";
			buttons += "<br /><input type=\"button\" onclick=\"" + onclick + "\" value=\"&lt;&lt; הקודם\" " + (episodeNumber >= 2 ? "" : "disabled=\"disabled\"") + " />";
		
			onclick = "document.getElementsByName('srch')[0].value = '" + episodeName + (episodeNumber + 1) + "'; document.getElementsByTagName('form')[0].submit();";
			buttons += "<input type=\"button\" onclick=\"" + onclick + "\" value=\"הבא &gt;&gt;\" />";
		}
	}
	
	document.getElementsByTagName("form")[0].innerHTML += "<br /><br />" + buttons + "<br /><br />";
}
