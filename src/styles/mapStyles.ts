import { StyleSheet } from "react-native";

// ====================
// Map Screen Layout
// ====================

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  map: {
    flex: 1,
  },

  // ====================
  // Header
  // ====================

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 0,
  },

  tagline: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },

  // ====================
  // Selected Stand Card
  // ====================

  standCard: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 90,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 5,
  },

  standTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  // ====================
  // Add Stand Form
  // ====================

  addForm: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 150,
    maxHeight: "70%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 6,
  },

  addFormTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  // ====================
  // Category Selection
  // ====================

  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },

  checkbox: {
    fontSize: 20,
    width: 32,
  },

  categoryText: {
    fontSize: 17,
  },

  // ====================
  // Form Actions
  // ====================

  closeButton: {
    position: "absolute",
    top: 8,
    right: 12,
    padding: 4,
    zIndex: 1,
  },

  closeButtonText: {
    fontSize: 28,
    fontWeight: "bold",
  },

  addText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  cancelText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },

  detailsText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },

  // ====================
  // Category Details
  // ====================

  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },

  otherItemText: {
    marginTop: 12,
    fontSize: 16,
  },

  otherItemInput: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});