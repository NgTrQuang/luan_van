package com.springboot.luanvan.controllers;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.luanvan.models.Address;
import com.springboot.luanvan.models.Invoice;
import com.springboot.luanvan.payload.request.InvoiceRequest;
import com.springboot.luanvan.payload.response.ApiResponse;
import com.springboot.luanvan.payload.response.MessageResponse;
import com.springboot.luanvan.repository.AddressRepository;
import com.springboot.luanvan.repository.InvoiceRepository;
import com.springboot.luanvan.security.services.InvoiceService;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
	@Autowired
	InvoiceService invoiceService;
	@Autowired
	InvoiceRepository invoiceRepository;
	@Autowired
	AddressRepository addressRepository;

	@PostMapping(value = "/create", consumes = { "*/*" })
//	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
	public ResponseEntity<Invoice> creatInvoice(@Valid @RequestBody InvoiceRequest invoiceRequest) {
		return new ResponseEntity<>(invoiceService.createInvoice(invoiceRequest), HttpStatus.CREATED);
	}

//	Lấy ra toàn bộ hóa đơn để Admin xem
	@GetMapping("/getAllInvoices")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('CRUD_ALLOW_ALL')") RBAC
	
//	@PreAuthorize("hasRole('ROLE_ADMIN')")   //Băt buoc co
	public ResponseEntity<List<Invoice>> getAllInvoices() {
		try {
			List<Invoice> lstInvoices = invoiceService.getAllInvoices();
			return new ResponseEntity<>(lstInvoices, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	Lấy ra toàn bộ hóa đơn của người dùng A đã thanh toán thành công
	@GetMapping("/getPaidInvoicesByUserId/{userId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
	public ResponseEntity<List<Invoice>> getInvoicesByUser(@PathVariable("userId") Long userId) {
		try {
			List<Invoice> lstInvoices = invoiceService.getPaidInvoicesByUserId(userId);
			return new ResponseEntity<>(lstInvoices, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
//	Lay ra danh sach don hang "Dang xu ly"
	@GetMapping("/getPendingInvoicesByUserId/{userId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
	public ResponseEntity<List<Invoice>> getPendingInvoicesByUserId(@PathVariable("userId") Long userId) {
		try {
			List<Invoice> lstInvoices = invoiceService.getPendingInvoicesByUserId(userId);
			return new ResponseEntity<>(lstInvoices, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
//	Don hang da duoc tao theo thu tu giam dan khong kem theo don hang thanh cong
	@GetMapping("/getHistoryInvoicesByUserId/{userId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
	public ResponseEntity<List<Invoice>> getHistoryInvoicesByUserId(@PathVariable("userId") Long userId) {
		try {
			List<Invoice> lstInvoices = invoiceService.getHistoryInvoicesByUserId(userId);
			return new ResponseEntity<>(lstInvoices, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	Don hang da duoc tao theo thu tu giam dan kem theo don hang da thanh cong
	@GetMapping("/getHistoryInvoicesByUserIdAndWasPayAndAction/{userId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
	public ResponseEntity<List<Invoice>> getHistoryInvoicesByUserIdAndWasPayAndAction(@PathVariable("userId") Long userId) {
		try {
			List<Invoice> lstInvoices = invoiceService.getHistoryInvoicesByUserIdAndWasPayAndAction(userId);
			return new ResponseEntity<>(lstInvoices, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	Lấy ra chỉ 1 hóa đơn của người dùng A (khi người dùng bấm từ giỏ hàng vào thanh toán hoặc khi bấm vào xem chi tiết 1 hóa đơn đã thành công nào đó)
	@GetMapping("/getInvoice/{invoiceId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
//	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
	public ResponseEntity<?> getInvoice(@PathVariable("invoiceId") Long invoiceId) {
		try {
			Invoice invoice = invoiceService.getInvoice(invoiceId);
			return ResponseEntity.ok(invoice);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

////	Chỉ MODERATOR hoặc ADMIN mới có quyền xóa
//	@DeleteMapping("/{invoiceId}")
////	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
//	public ResponseEntity<?> softDeleteInvoice(@PathVariable("invoiceId") Long invoiceId) {
//		try {
//			invoiceService.softDeleteInvoiceById(invoiceId);
//			return ResponseEntity.ok(new MessageResponse("Dữ liệu đã bị ngắt kết nối (soft_delete)!"));
//		} catch (Exception e) {
//			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

////	Chỉ MODERATOR hoặc ADMIN mới có quyền xóa
//	@DeleteMapping("/delete/{invoiceId}")
////	@PreAuthorize("hasRole('CRUD_ALLOW_ALL')")
//	public ResponseEntity<?> hardDeleteInvoice(@PathVariable("invoiceId") Long invoiceId) {
//		try {
//			invoiceService.hardDeleteInvoiceById(invoiceId);
//			return ResponseEntity.ok(new MessageResponse("Đã xóa dữ liệu thành công trong CSDL!"));
//		} catch (Exception e) {
//			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

//	@PutMapping(value = "/updateInvoice/{invoiceId}", consumes = { "*/*" })
////	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
//	public ResponseEntity<Optional<Invoice>> updateProductsAndAddressInInvoice(
//			@PathVariable("invoiceId") Long invoiceId, @Valid @RequestBody InvoiceRequest invoiceRequest) {
//		Invoice invoice = invoiceRepository.findById(invoiceId).orElseThrow();
//		List<Address> addresses = addressRepository.findByUser_UserIdAndStatus(invoice.getUser().getUserId(), true);
//
//		Address address = addressRepository.findById(invoiceRequest.getAddress_id()).orElseThrow();
//
//		boolean check = false;
//		for (Address address0 : addresses) {
//			if (address.equals(address0)) {
//				check = true;
//			}
//		}
//
//		if (!invoice.getAddress().equals(address)) {
//			if (check)
//				return new ResponseEntity<>(invoiceService.updateAddressInInvoice(invoice, address), HttpStatus.OK);
//		}
//		if (invoice.isWasPay() == false) {
//		return new ResponseEntity<>(invoiceService.updateProductsInInvoice(invoice, invoiceRequest.getUser_id()),
//				HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
	
	@PutMapping("/updateAction/{invoiceId}/{newAction}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateInvoiceAction(
	        @PathVariable Long invoiceId,
	        @PathVariable String newAction
	) {
	    try {
	        Invoice updatedInvoice = invoiceService.updateInvoiceAction(invoiceId, newAction);
	        return ResponseEntity.ok(updatedInvoice);
	    } catch (EntityNotFoundException ex) {
	        return ResponseEntity.status(404).body(ex.getMessage());
	    } catch (Exception ex) {
	        return ResponseEntity.status(500).body("Error updating invoice action");
	    }
	}

	@PutMapping("/updateActionToVnPay/{invoiceId}/{newAction}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateActionToVnPay(
	        @PathVariable Long invoiceId,
	        @PathVariable String newAction
	) {
	    try {
	        Invoice updatedInvoice = invoiceService.updateInvoiceActionToVnPay(invoiceId, newAction);
	        return ResponseEntity.ok(updatedInvoice);
	    } catch (EntityNotFoundException ex) {
	        return ResponseEntity.status(404).body(ex.getMessage());
	    } catch (Exception ex) {
	        return ResponseEntity.status(500).body("Error updating invoice action");
	    }
	}
	
	@PutMapping("/updateActionAfterReceived/{invoiceId}/{newAction}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateActionAfterReceivedVnPay(
	        @PathVariable Long invoiceId,
	        @PathVariable String newAction
	) {
	    try {
	        Invoice updatedInvoice = invoiceService.updateInvoiceActionAfterReceived(invoiceId, newAction);
	        return ResponseEntity.ok(updatedInvoice);
	    } catch (EntityNotFoundException ex) {
	        return ResponseEntity.status(404).body(ex.getMessage());
	    } catch (Exception ex) {
	        return ResponseEntity.status(500).body("Error updating invoice action");
	    }
	}
		
	
	@PutMapping("/updateRefund/{invoiceId}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateRefundStatus(
	        @PathVariable Long invoiceId
	) {
	    try {
	        Invoice updatedInvoice = invoiceService.updateRefundStatus(invoiceId);
	        return ResponseEntity.ok(updatedInvoice);
	    } catch (EntityNotFoundException ex) {
	        return ResponseEntity.status(404).body(ex.getMessage());
	    } catch (Exception ex) {
	        return ResponseEntity.status(500).body("Error updating invoice action");
	    }
	}

//	@PutMapping(value = "/reactivation/{invoiceId}", consumes = { "*/*" })
////	@PreAuthorize("hasRole('INVOICE_NORMAL_ACCESS')")
//	public ResponseEntity<?> treeReactivationById(@PathVariable("invoiceId") Long invoiceId) {
//		return new ResponseEntity<>(invoiceService.invoiceReactivationById(invoiceId), HttpStatus.CREATED);
//	}
	
	// Thống kê
	@GetMapping("/count")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Long> countInvoices(){
		return new ResponseEntity<Long>(invoiceService.countInvoices(), HttpStatus.OK);
	}
	
	@GetMapping("/wasPay/count")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Long> countPaidInvoices(){
		return new ResponseEntity<Long>(invoiceService.countPaidInvoices(), HttpStatus.OK);
	}
	
	@GetMapping("/total-revenue/count")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ResponseEntity<Double> getTotalRevenue(){
		return new ResponseEntity<Double>(invoiceService.getTotalRevenue(), HttpStatus.OK);
	}
}
