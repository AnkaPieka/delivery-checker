import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkDelivery } from "../logic/deliveryChecker";

describe("checkDelivery", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("should return success result for valid deliveries and path", () => {
    // Arrange
    const deliveries = [
      [1, 3],
      [2, 4],
    ];
    const path = [1, 2, 3, 4, 5];

    // Act
    const result = checkDelivery(deliveries, path);

    // Assert
    expect(result).toEqual({
      status: "success",
      steps: [
        { address: 1, action: "pickup" },
        { address: 2, action: "pickup" },
        { address: 3, action: "dropoff" },
        { address: 4, action: "dropoff" },
        { address: 5, action: null },
      ],
    });
  });

  it("should return error when deliveries parameter is invalid", () => {
    // Arrange
    const deliveries = "invalid";
    const path = [1, 2, 3];

    // Act
    const result = checkDelivery(deliveries as any, path);

    // Assert
    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.error_code).toBe("invalid_input_format");
      expect(result.error_message).toContain("deliveries");
    }
  });

  it("should return error when path parameter is invalid", () => {
    // Arrange
    const deliveries = [[1, 2]];
    const path = "invalid";

    // Act
    const result = checkDelivery(deliveries, path as any);

    // Assert
    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.error_code).toBe("invalid_input_format");
      expect(result.error_message).toContain("path");
    }
  });


  it("should return error when delivery address is not in path", () => {
    // Arrange
    const deliveries = [
      [1, 3],
      [2, 6],
    ]; // L'adresse 6 n'est pas dans le chemin
    const path = [1, 2, 3, 4, 5];

    // Act
    const result = checkDelivery(deliveries, path);

    // Assert
    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.error_code).toBe("delivery_address_not_in_path");
      expect(result.error_message).toContain("6");
    }
  });

  it("should return error when dropoff occurs before pickup", () => {
    // Arrange
    const deliveries = [[3, 1]]; // Pickup à l'adresse 3, dropoff à l'adresse 1
    const path = [1, 2, 3, 4, 5]; // L'adresse 1 vient avant l'adresse 3

    // Act
    const result = checkDelivery(deliveries, path);

    // Assert
    expect(result.status).toBe("error");
    if (result.status === "error") {
      expect(result.error_code).toBe("delivery_dropoff_before_pickup");
      expect(result.error_message).toContain("1");
      expect(result.error_message).toContain("3");
    }
  });

  it('should return error when delivery address is not in path', () => {
    // Arrange
    const deliveries = [[1, 3], [2, 6]] // L'adresse 6 n'est pas dans le chemin
    const path = [1, 2, 3, 4, 5]

    // Act
    const result = checkDelivery(deliveries, path)

    // Assert
    expect(result.status).toBe('error')
    if (result.status === 'error') {
      expect(result.error_code).toBe('delivery_address_not_in_path')
      expect(result.error_message).toContain('6')
    }
  })

  it('should handle address 0 correctly (not treat it as falsy)', () => {
    // Arrange
    const deliveries = [[0, 2], [1, 3]]
    const path = [0, 1, 2, 3, 4]

    // Act
    const result = checkDelivery(deliveries, path)

    // Assert
    expect(result.status).toBe('success')
    if (result.status === 'success') {
      expect(result.steps).toEqual([
        { address: 0, action: 'pickup' },  // 0 doit être traité comme un nombre valide
        { address: 1, action: 'pickup' },
        { address: 2, action: 'dropoff' },
        { address: 3, action: 'dropoff' },
        { address: 4, action: null }
      ])
    }
  })

  it('should handle path starting with address 0', () => {
    // Arrange
    const deliveries = [[1, 0]] // Pickup à 1, dropoff à 0
    const path = [0, 1, 2]

    // Act
    const result = checkDelivery(deliveries, path)

    // Assert
    expect(result.status).toBe('error')
    if (result.status === 'error') {
      expect(result.error_code).toBe('delivery_dropoff_before_pickup')
      expect(result.error_message).toContain('0')
      expect(result.error_message).toContain('1')
    }
  })
});
