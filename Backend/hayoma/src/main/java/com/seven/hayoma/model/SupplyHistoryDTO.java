// Duplicate file, should be removed. All usages should use the correct DTO in com.seven.hayoma.dto package.

import com.seven.hayoma.model.PaymentStatus;
import com.seven.hayoma.model.SupplyStatus;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplyHistoryDTO {
    private Long id;
    private String supplyId;
    private String productName;
    private String unit;
    private double quantity;
    private LocalDate date;
    private SupplyStatus status;
    private PaymentStatus payment;
    private double amount;
}