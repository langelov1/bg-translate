/**
 * Override Chart of Accounts tree to translate account names per user language.
 *
 * ERPNext stores account names in English (e.g. "Cost of Goods Sold - ABC").
 * The tree view displays these directly. This override strips the company
 * suffix, passes the base name through __() for translation, then re-adds
 * the suffix. Translations come from the Translation doctype.
 *
 * Also applies to Cost Center and Warehouse trees.
 */

frappe.provide("frappe.treeview_settings");

// Wait for ERPNext to register its treeview settings, then patch
$(document).ready(function () {
	patch_tree("Account");
	patch_tree("Cost Center");
	patch_tree("Warehouse");
	patch_tree("Department");
});

function patch_tree(doctype) {
	// Use a short interval to wait for ERPNext to set up treeview_settings
	let attempts = 0;
	let interval = setInterval(function () {
		attempts++;
		if (frappe.treeview_settings && frappe.treeview_settings[doctype]) {
			frappe.treeview_settings[doctype].get_label = function (node) {
				return translate_tree_label(node.label || node.value || "");
			};
			clearInterval(interval);
		}
		if (attempts > 20) {
			clearInterval(interval);
		}
	}, 200);
}

function translate_tree_label(label) {
	// Account/Cost Center/Warehouse names have format "Name - CompanyAbbr"
	// Strip the suffix, translate, re-add
	let match = label.match(/^(.+?)\s+-\s+([^-]+)$/);
	if (match) {
		let base_name = match[1].trim();
		let suffix = match[2].trim();
		let translated = __(base_name);
		return translated + " - " + suffix;
	}
	return __(label);
}
