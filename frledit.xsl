<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" />
<xsl:template match="/">
  <xsl:for-each select="EditCollection/Items/EditItem">
    <li class="listview-entry enabled-{@Enabled}">
      <ul class="record">
        <li class="find-text-item">
          <label class="detail-label label-find">Find:</label>
          <input type="text" class="find-text-input" value="{FindText}"></input>
        </li>
        <li class="replace-text-item">
          <label class="detail-label label-replace">Replace:</label>
          <input type="text" class="replace-text-input" value="{ReplaceText}"></input>
        </li>
        <li class="replace-type-item">
          <label class="detail-label label-type">Type:</label>
        <select class="replace-type-combo">
        <xsl:choose>
        <xsl:when test="@EditItemType='regular_expression'">
          <option class="type-option option-regex" selected="selected" value="regular_expression">Regular expression</option>
          <option class="type-option option-plaintext" value="plain_text">Plain text</option>
        </xsl:when>
        <xsl:otherwise>
          <option class="type-option option-plaintext" selected="selected" value="plain_text">Plain text</option>
          <option class="type-option option-regex" value="regular_expression">Regular expression</option>
        </xsl:otherwise>
        </xsl:choose>
        </select>
        </li>
        <li class="replace-enabled-item">
          <label class="detail-label label-status">Status:</label>
        <select class="replace-enabled-combo" onchange="changeEnabledStatus(this)">
        <xsl:choose>
        <xsl:when test="@Enabled='true'">
          <option class="status-option option-enabled" selected="selected" value="true">Enabled</option>
          <option class="status-option option-disabled" value="false">Disabled</option>
        </xsl:when>
        <xsl:otherwise>
          <option class="status-option option-disabled" selected="selected" value="false">Disabled</option>
          <option class="status-option option-enabled" value="true">Enabled</option>
        </xsl:otherwise>
        </xsl:choose>
        </select>
        </li>
        <li><button type="button" onclick="doDelete(this)">X</button></li>
        <li><button type="button" onclick="doMoveUp(this)">&#x2191;</button></li>
        <li><button type="button" onclick="doMoveDown(this)">&#x2193;</button></li>
      </ul>
    </li>
  </xsl:for-each>
</xsl:template>
</xsl:stylesheet>